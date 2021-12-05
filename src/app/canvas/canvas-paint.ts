import { inject, InjectionToken } from '@angular/core';
import { combineLatest, exhaustMap, last, map, Observable, switchMap, takeUntil } from 'rxjs';

import { BRUSH_COLOR } from '../brush/brush-color';
import { stroke } from '../croquis/brush/simple';
import { getStylusState } from '../croquis/stylus';
import { pointerdown, pointermove, pointerup } from '../events/pointer';
import { CANVAS_CONTEXT } from './canvas-context';

export const CANVAS_PAINT = new InjectionToken<Observable<ImageData>>('paint', {
  providedIn: 'root',
  factory: () => {

    const color$ = inject(BRUSH_COLOR);
    const ctx$ = inject(CANVAS_CONTEXT);

    return combineLatest([ctx$, color$]).pipe(
      switchMap(([ctx, color]) => {

        const down = pointerdown(ctx.canvas);
        const move = pointermove(ctx.canvas);
        const up = pointerup(ctx.canvas);
        
        return down.pipe(

          map((event) => stroke.down({
            ctx,
            color,
            size: 20,
          }, getStylusState(event))),
      
          exhaustMap((drawingContext) => move.pipe(
              map((event) => drawingContext.move(getStylusState(event))),
              takeUntil(up.pipe(
                map((event) => drawingContext.up(getStylusState(event)))
              )),
              last(),
              map(() => ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)),
          )),
        )
      })
    );
  } 
})
