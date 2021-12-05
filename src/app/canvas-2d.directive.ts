import { Directive, ElementRef, OnDestroy } from '@angular/core';
import { combineLatest, first, map, Subscription, switchMap, switchMapTo, takeUntil } from 'rxjs';

import { stroke } from './croquis/brush/simple';
import { getStylusState } from './croquis/stylus';
import { pointerdown, pointermove, pointerup } from './events/pointer';
import { PlayerService } from './player.service';

@Directive({
  selector: `canvas[context2d]`,
  exportAs: 'canvas',
})
export class CanvasContext2dDirective implements OnDestroy {

  canvas = this.elementRef.nativeElement;
  ctx = this.canvas.getContext('2d')!;

  private down$ = pointerdown(this.canvas);
  private move$ = pointermove(this.canvas);

  painting$ = this.player.color$.pipe(
    switchMap((color) => this.down$.pipe(
      map((event) => stroke.down({
        ctx: this.ctx,
        color,
        size: 20,
      }, getStylusState(event))),
  
      switchMap((drawingContext) => this.move$.pipe(
        map((event) => drawingContext.move(getStylusState(event))),
        takeUntil(pointerup(this.canvas).pipe(
          map((event) => drawingContext.up(getStylusState(event)))
        )),
      )),
    ))
  );

  paintEnd$ = this.down$.pipe(
    switchMapTo(pointerup(this.canvas).pipe(
      first(),
    )),
    map(() => this.get()),
  );

  private subscription = new Subscription();

  constructor(
    private readonly elementRef: ElementRef<HTMLCanvasElement>,
    private readonly player: PlayerService,
  ) {
    this.canvas.height = this.canvas.offsetHeight;
    this.canvas.width = this.canvas.offsetWidth;

    this.player.canvas$.next(this);

    this.subscription.add(this.painting$.subscribe());

    this.subscription.add(combineLatest([this.player.store$, this.player.frame$]).pipe(
      map(([data, frame])=> data.get(frame)),
      // map(([frame, data])=> closest(frame, data) ?? undefined),
    ).subscribe((img) => {
      if (img) {
        this.put(img);
      } else {
        this.clear();
      }
    }));

    this.subscription.add(this.player.clear$.subscribe(() => {
      this.clear();
    }))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  put(img: ImageData): void {
    this.ctx.putImageData(img, 0, 0);
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  get(): ImageData {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }
}
