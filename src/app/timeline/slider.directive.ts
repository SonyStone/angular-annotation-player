import { Directive, ElementRef, Inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { combineLatest, map, merge, pipe, shareReplay, Subscription, switchMapTo, takeUntil, tap, withLatestFrom } from 'rxjs';

import { pointerdown, pointerdrag, pointermove, pointerup } from '../events/pointer';
import { TimelinePosition } from '../interfaces/TimelinePosition';
import { VideoTime } from '../interfaces/VideoTime';
import { VideoService } from '../utilities/video.service';


@Directive({
  selector: '[slider]'
})
export class SliderDirective implements OnDestroy {

  private element = this.elementRef.nativeElement;

  @Input('slider') rect!: DOMRect;

  private toFrame = pipe(
    withLatestFrom<PointerEvent, [VideoTime]>(this.video.duration$),
    map(([pointerEvent, duration]) => {
      const pointerX = pointerEvent.offsetX;
      const width = this.rect.width;

      const position = (pointerEvent.offsetX <= 0)
        ? 0
        : (pointerX >= width)
          ? width
          : pointerX as TimelinePosition;
  
      return (position * duration  / width) as VideoTime;
    }),
  )

  drag$ = pointerdrag(this.element).pipe(
    this.toFrame,
    shareReplay(),
  );

  private subscription = new Subscription();

  constructor(
    private render: Renderer2,
    private elementRef: ElementRef<Element>,
    @Inject(VideoService) private readonly video: VideoService,
  ) {
    this.subscription.add(this.drag$.subscribe((time) => this.video.currentTimeChange$.next(time)));

    this.subscription.add(combineLatest([
      merge(
        this.drag$,
        this.video.currentTime$,
      ),
      this.video.duration$]).pipe(
      map(([time, duration]) => ((time / duration * this.rect.width) || 0) as TimelinePosition),
    ).subscribe((translate) => {
      this.render.setAttribute(this.elementRef.nativeElement, 'transform', `translate(${translate})`);
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
