import { Inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';

import { getFrameSize, VideoTime } from '../../interfaces/VideoTime';
import { VideoFPS } from './video-fps';

@Injectable()
export class VideoFrameSize extends Observable<VideoTime> {
  constructor(
    @Inject(VideoFPS) fps$: VideoFPS,
  ) {
    const source = fps$.pipe(
      map((fps) => getFrameSize(fps)),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}
