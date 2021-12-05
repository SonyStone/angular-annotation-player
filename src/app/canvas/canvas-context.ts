import { inject, InjectionToken } from '@angular/core';
import { map, Observable, shareReplay, tap } from 'rxjs';

import { CANVAS_ELEMENT } from './canvas-element';

export const CANVAS_CONTEXT = new InjectionToken<Observable<CanvasRenderingContext2D>>('ctx', {
  providedIn: 'root',
  factory: () => {
    
    const canvas$ = inject(CANVAS_ELEMENT);

    return canvas$.pipe(
      map((canvas) => {
        
        canvas.height = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;

        return canvas.getContext('2d')!;
      }),
      tap((e) => {
        console.log(`canvas`, e);
      }),
      shareReplay(),
    );
  } 
})
