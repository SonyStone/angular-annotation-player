import { Inject, Injectable } from '@angular/core';
import { mapTo, merge, Observable, scan, share, shareReplay, switchMap, tap } from 'rxjs';

import { Pause } from '../actions/pause';
import { Play } from '../actions/play';
import { VideoElement } from './video-element';

@Injectable()
export class VideoIsPlaying extends Observable<boolean> {
  constructor(
    @Inject(VideoElement) video$: VideoElement,
    @Inject(Play) play$: Play,
    @Inject(Pause) pause$: Pause,
  ) {
    const source = video$.pipe(
      switchMap((video) => playPauseControls(play$, pause$).pipe(
        tap((isPlay) => {
          if (isPlay) {
            video.play();
          } else {
            video.pause();
          }
        })
      )),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}

function playPauseControls(
  playPause$: Observable<unknown>,
  pause$: Observable<unknown>,
): Observable<boolean> {
  return toggle(merge(
    playPause$.pipe(mapTo(PlayControl.Toggle)),
    pause$.pipe(mapTo(PlayControl.Pause)),
  ));
}

export function toggle(
  toggle$: Observable<PlayControl>,
): Observable<boolean> {
  return toggle$.pipe(
    scan((accumulator: boolean, value: PlayControl) => {
      switch (value) {
        case PlayControl.Toggle:
          accumulator = !accumulator;
          return accumulator;
        case PlayControl.Play:
          return true;
        case PlayControl.Pause:
          return false;
        default:
          return accumulator;
      }
    }, false),
    share(),
  )
}

enum PlayControl {
  Toggle,
  Play,
  Pause,
}
