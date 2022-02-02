import { Inject, Injectable } from '@angular/core';
import { combineLatest, fromEvent, map, Observable, shareReplay, switchMap } from 'rxjs';
import { toVideoTime } from 'src/app/interfaces/VideoTime';

import { Frame } from '../../interfaces/Frame';
import { VideoElement } from './video-element';
import { VideoFrameSize } from './video-frame-size';


@Injectable()
export class VideoTotalFrames extends Observable<Frame> {
  constructor(
    @Inject(VideoFrameSize) frameSize$: VideoFrameSize,
    @Inject(VideoElement) video$: Observable<HTMLVideoElement>,
  ) {

    const duration$ = video$.pipe(
      switchMap((video) => fromEvent<Event>(video, 'durationchange').pipe(
        map(() => toVideoTime(video.duration)),
      )),
    );

    const source = combineLatest([
      duration$,
      frameSize$,
    ]).pipe(
      map(([time, frameSize]) => Math.floor(time / frameSize) as Frame),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}