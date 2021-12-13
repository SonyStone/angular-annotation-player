import { Inject, Injectable } from '@angular/core';
import {
  combineLatest,
  exhaustMap,
  last,
  map,
  Observable,
  ReplaySubject,
  shareReplay,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';

import { BrushService } from '../brush/brush.service';
import { stroke } from '../croquis/brush/simple';
import { getStylusState } from '../croquis/stylus';
import { pointerdown, pointermove, pointerup } from '../events/pointer';

@Injectable()
export class CanvasService {
  canvas$ = new ReplaySubject<HTMLCanvasElement>();
  ctx$ = canvasContext(this.canvas$);
  paint$ = canvasPaint(this.ctx$, this.brush.color$, this.brush.size$, this.brush.compositeOperation$);

  constructor(
    @Inject(BrushService) private readonly brush: BrushService,
  ) {}
}


export function canvasContext(
  canvas$: Observable<HTMLCanvasElement>,
): Observable<CanvasRenderingContext2D> {
  return canvas$.pipe(
    map((canvas) => canvas.getContext('2d')!),
    tap((e) => {
      console.log(`canvas`, e);
    }),
    shareReplay(),
  ); 
}

export function canvasPaint(
  ctx$: Observable<CanvasRenderingContext2D>,
  color$: Observable<string>,
  size$: Observable<number>,
  globalCompositeOperation$: Observable<string>,
) {
  return combineLatest([ctx$, color$, size$, globalCompositeOperation$]).pipe(
    switchMap(([ctx, color, size, globalCompositeOperation]) => {

      const down = pointerdown(ctx.canvas);
      const move = pointermove(ctx.canvas);
      const up = pointerup(ctx.canvas);
      
      return down.pipe(
        tap((v) => { console.log(`log-down`, v); }),
        map((event) => stroke.down({
          ctx,
          color,
          size,
          globalCompositeOperation,
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
