import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';

import { Frame } from '../../interfaces/Frame';
import { VideoCurrentTime } from './video-current-time';
import { VideoFPS } from './video-fps';
import { videoTimeToFrame } from '../videoTimeToFrame';


@Injectable()
export class VideoCurrentFrame extends Observable<Frame> {
  constructor(
    @Inject(VideoCurrentTime) currentTime$: VideoCurrentTime,
    @Inject(VideoFPS) fps$: VideoFPS,
  ) {
    const source = combineLatest([
      currentTime$,
      fps$,
    ]).pipe(
      map(([time, fps]) => videoTimeToFrame(time, fps)),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}