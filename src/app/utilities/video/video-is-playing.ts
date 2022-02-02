import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, filter, fromEvent, mapTo, merge, shareReplay, switchMap, tap } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

import { VideoElement } from './video-element';

@Injectable()
export class VideoIsPlaying extends AnonymousSubject<boolean> {

  private isPlaying: boolean;

  constructor(
    @Inject(VideoElement) video$: VideoElement,
  ) {
    const destination = new BehaviorSubject<boolean>(false);

    const source = video$.pipe(
      switchMap((video) => merge(
        destination.pipe(
          filter((isPlaying) => {
            if (isPlaying) {
              video.play()
            } else {
              video.pause()
            }
    
            return false
          }),
        ),
        fromEvent(video, 'play').pipe(mapTo(true)),
        fromEvent(video, 'pause').pipe(mapTo(false)),
      )),
      tap((isPlaying) => {
        this.isPlaying = isPlaying;
      }),
      tap((v) => { console.log(`log-IsPlaying`, v); }),
      shareReplay(),
    );

    super(destination, source);

    this.isPlaying = destination.value;
  }

  play(): void {
    this.next(true);
  }

  pause(): void {
    this.next(false);
  }

  toggle(): void {
    this.next(!this.isPlaying);
  }
}
