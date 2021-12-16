import { Inject, Injectable } from '@angular/core';
import {
  exhaustMap,
  last,
  map,
  Observable,
  ReplaySubject,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs';

import { BrushService } from './brush.service';
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
    shareReplay(),
  ); 
}

export function canvasPaint(
  ctx$: Observable<CanvasRenderingContext2D>,
  color$: Observable<string>,
  size$: Observable<number>,
  globalCompositeOperation$: Observable<string>,
) {
  return ctx$.pipe(
    switchMap((ctx) => pointerdown(ctx.canvas).pipe(
      withLatestFrom(color$, size$, globalCompositeOperation$),
      exhaustMap(([event, color, size, globalCompositeOperation]) => {

        const context = stroke.down({
          ctx,
          color,
          size,
          globalCompositeOperation,
        }, getStylusState(event))

        return pointermove(ctx.canvas).pipe(
          startWith(event),
          map((event) => context.move(getStylusState(event))),
          takeUntil(pointerup(ctx.canvas).pipe(
            map((event) => context.up(getStylusState(event))),
          )),
          last(),
          map(() => ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)),
        );
      }),
    )),
    shareReplay(),
  );
}
