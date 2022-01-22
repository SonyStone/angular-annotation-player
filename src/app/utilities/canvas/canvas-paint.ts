import { Inject, Injectable } from '@angular/core';
import { exhaustMap, last, map, Observable, shareReplay, startWith, switchMap, takeUntil, withLatestFrom } from 'rxjs';

import { stroke } from '../../croquis/brush/simple';
import { getStylusState } from '../../croquis/stylus';
import { pointerdown, pointermove, pointerup } from '../../events/pointer';
import { BrushColor } from '../brush/brush-color';
import { BrushSize } from '../brush/brush-size';
import { CompositeOperation } from '../brush/compositeOperation';
import { CanvasContext } from './canvas-context';

@Injectable()
export class CanvasPaint extends Observable<ImageData> {
  constructor(
    @Inject(CanvasContext) ctx$: CanvasContext,
    @Inject(BrushColor) color$: BrushColor,
    @Inject(BrushSize) size$: BrushSize,
    @Inject(CompositeOperation) compositeOperation$: CompositeOperation,
  ) {


    const source = ctx$.pipe(
      switchMap((ctx) => pointerdown(ctx.canvas).pipe(
        withLatestFrom(color$, size$, compositeOperation$),
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

    super((subscriber) => source.subscribe(subscriber));
  }
}