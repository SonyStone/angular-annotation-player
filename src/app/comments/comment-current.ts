import { inject, InjectionToken } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';

import { PlayerService } from '../player.service';
import { VIDEO_CURRENT_FRAME } from '../video/video-current-frame';

export const COMMENT_CURRENT_IMAGE = new InjectionToken<Observable<ImageData | undefined>>('current frame', {
  providedIn: 'root',
  factory: () => {

    const currentFrame$ = inject(VIDEO_CURRENT_FRAME);
    const player = inject(PlayerService);

    return combineLatest([
      player.store$,
      currentFrame$,
    ]).pipe(
      map(([data, frame])=> data.get(frame)),
      // map(([frame, data])=> closest(frame, data) ?? undefined),
      shareReplay(),
    )
  },
})
