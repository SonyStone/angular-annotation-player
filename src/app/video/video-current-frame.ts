import { inject, InjectionToken } from '@angular/core';
import { combineLatest, map, Observable, ReplaySubject, shareReplay } from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { VIDEO_CURRENT_TIME } from './video-current-time';
import { VIDEO_FPS } from './video-fps';
import { videoTimeToFrame } from './videoTimeToFrame';

export const VIDEO_CURRENT_FRAME = new InjectionToken<Observable<Frame>>('current frame', {
  providedIn: 'root',
  factory: () => {

    const currentTime$ = inject(VIDEO_CURRENT_TIME);
    const fps$ = inject(VIDEO_FPS);

    return combineLatest([
      currentTime$,
      fps$,
    ]).pipe(
      map(([time, fps]) => videoTimeToFrame(time, fps)),
      shareReplay(),
    )
  },
})
