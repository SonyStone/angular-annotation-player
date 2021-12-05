import { inject, InjectionToken } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { CANVAS_PAINT } from '../canvas/canvas-paint';
import { Frame } from '../interfaces/Frame';
import { VIDEO_CURRENT_FRAME } from '../video/video-current-frame';

export const COMMENT_STORE = new InjectionToken<Observable<Map<Frame, ImageData>>>('comment store', {
  providedIn: 'root',
  factory: () => {

    const paint$ = inject(CANVAS_PAINT);
    const currentFrame$ = inject(VIDEO_CURRENT_FRAME);

    const currentImgPaint$ = paint$.pipe(
      withLatestFrom(currentFrame$),
      map(([imageData, frame]) => (store: Map<Frame, ImageData>) => {
        store.set(frame, imageData);
  
        return store;
      }),
    );

    // const put

    
    return new ReplaySubject();
  },
})

