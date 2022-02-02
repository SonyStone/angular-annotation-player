import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  exhaustMap,
  last,
  map,
  merge,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { stroke } from 'src/app/croquis/brush/simple';
import { getStylusState } from 'src/app/croquis/stylus';
import { pointerdown, pointermove, pointerup } from 'src/app/events/pointer';

import { BrushColor } from '../brush/brush-color';
import { BrushSize } from '../brush/brush-size';
import { CompositeOperation } from '../brush/compositeOperation';
import { CanvasContext } from './canvas-context';


@Injectable()
export class CurrentImage extends AnonymousSubject<ImageData | undefined> {
  constructor(
    @Inject(CanvasContext) ctx$: CanvasContext,
    @Inject(BrushColor) color$: BrushColor,
    @Inject(BrushSize) size$: BrushSize,
    @Inject(CompositeOperation) compositeOperation$: CompositeOperation,
  ) {
    const destination = new BehaviorSubject<ImageData | undefined>(undefined);
    const source = ctx$.pipe(
      switchMap((ctx) => merge(
        pointerdown(ctx.canvas).pipe(
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
            );
          }),
          map(() => ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)),
        ),
        destination.pipe(
          map((img) => {
            if (img) {
              ctx.putImageData(img, 0, 0);
              return img;
            } else {
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
              return undefined;
            }
          })
        ),
      )),
      shareReplay(),
    );

    super(destination, source);
  }

  clear(): void {
    this.next(undefined);
  }
}