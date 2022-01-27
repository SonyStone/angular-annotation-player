import { Inject, Injectable } from '@angular/core';
import { fromEvent, map, Observable, shareReplay, switchMap, withLatestFrom } from 'rxjs';

import { VideoTime } from '../../interfaces/VideoTime';
import { VideoElement } from './video-element';
import { VideoFrameSize } from './video-frame-size';

@Injectable()
export class VideoDuration extends Observable<VideoTime> {
  constructor(
    @Inject(VideoElement) video$: Observable<HTMLVideoElement>,
    @Inject(VideoFrameSize) frameSize$: Observable<VideoTime>,
  ) {
    const source = video$.pipe(
      switchMap((video) => fromEvent<Event>(video, 'durationchange').pipe(
        withLatestFrom(frameSize$),
        map(([_, frameSize]) => video.duration as VideoTime),
      )),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}