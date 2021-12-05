import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { combineLatest, map, merge, pipe, Subscription, switchMapTo, takeUntil, withLatestFrom } from 'rxjs';

import { pointerdown, pointermove, pointerup } from '../events/pointer';
import { TimelinePosition } from '../interfaces/TimelinePosition';
import { VideoTime } from '../interfaces/VideoTime';
import { PlayerService } from '../player.service';

@Directive({
  selector: '[slider]'
})
export class SliderDirective implements OnDestroy {

  private element = this.elementRef.nativeElement;

  @Input('slider') rect!: DOMRect;

  private down$ = pointerdown(this.element);
  private move$ = pointermove(this.element);

  private toFrame = pipe(
    withLatestFrom<PointerEvent, [VideoTime]>(this.player.duration$),
    map(([pointerEvent, duration]) => {
      const pointerX = pointerEvent.offsetX;
      const width = this.rect.width;

      const position = (pointerEvent.offsetX <= 0)
        ? 0
        : (pointerX >= width)
          ? width
          : pointerX as TimelinePosition;
  
      return position * duration  / width as VideoTime
    }),
  )

  drag$ = this.down$.pipe(switchMapTo(this.move$.pipe(takeUntil(pointerup(this.element))))).pipe(
    this.toFrame,
  );
  
  private subscription = new Subscription();

  constructor(
    private readonly player: PlayerService,
    private render: Renderer2,
    private elementRef: ElementRef<Element>,
  ) {
    console.log(`slider created!`);

    this.player.sliderTime.next(this.drag$);

    this.subscription.add(combineLatest([
      merge(
        this.drag$,
        this.player.currentTime$,
        this.player.scroll$,
      ),
      this.player.duration$]).pipe(
      map(([time, duration]) => ((time / duration * this.rect.width) || 0) as TimelinePosition),
    ).subscribe((translate) => {
      this.render.setAttribute(this.elementRef.nativeElement, 'transform', `translate(${translate})`);
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
