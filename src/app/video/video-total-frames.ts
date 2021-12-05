import { inject, InjectionToken } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { VIDEO_DURATION } from './video-duration';
import { VIDEO_FPS } from './video-fps';
import { videoTimeToFrame } from './videoTimeToFrame';

export const VIDEO_TOTAL_FRAMES = new InjectionToken<Observable<Frame>>('total frames', {
  providedIn: 'root',
  factory: () => {

    const duration$ = inject(VIDEO_DURATION);
    const fps$ = inject(VIDEO_FPS);

    return combineLatest([
      duration$,
      fps$,
    ]).pipe(
      map(([time, fps]) => videoTimeToFrame(time, fps)),
      shareReplay(),
    )
  },
})
