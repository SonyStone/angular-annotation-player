import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { Frame } from '../../interfaces/Frame';

import { VideoDuration } from './video-duration';
import { VideoFPS } from './video-fps';
import { videoTimeToFrame } from '../videoTimeToFrame';


@Injectable()
export class VideoTotalFrames extends Observable<Frame> {
  constructor(
    @Inject(VideoFPS) fps$: VideoFPS,
    @Inject(VideoDuration) duration$: VideoDuration,
  ) {
    const source = combineLatest([
      duration$,
      fps$,
    ]).pipe(
      map(([time, fps]) => videoTimeToFrame(time, fps)),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}