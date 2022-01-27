import { Inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';

import { VideoTime } from '../../interfaces/VideoTime';
import { VideoFPS } from './video-fps';

@Injectable()
export class VideoFrameSize extends Observable<VideoTime> {
  constructor(
    @Inject(VideoFPS) fps$: VideoFPS,
  ) {
    const source = fps$.pipe(
      map((fps) => (1 / fps) as VideoTime),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}
