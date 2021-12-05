import { Directive, ElementRef, Inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import {
  combineLatest,
  map,
  merge,
  Observable,
  pipe,
  Subject,
  Subscription,
  switchMapTo,
  takeUntil,
  withLatestFrom,
} from 'rxjs';

import { pointerdown, pointermove, pointerup } from '../events/pointer';
import { Frame } from '../interfaces/Frame';
import { TimelinePosition } from '../interfaces/TimelinePosition';
import { VideoTime } from '../interfaces/VideoTime';
import { VIDEO_CURRENT_TIME, VIDEO_CURRENT_TIME_CHANGE } from '../video/video-current-time';
import { VIDEO_DURATION } from '../video/video-duration';
import { VIDEO_TOTAL_FRAMES } from '../video/video-total-frames';


@Directive({
  selector: '[slider]'
})
export class SliderDirective implements OnDestroy {

  private element = this.elementRef.nativeElement;

  @Input('slider') rect!: DOMRect;

  private down$ = pointerdown(this.element);
  private move$ = pointermove(this.element);

  private toFrame = pipe(
    withLatestFrom<PointerEvent, [Frame, VideoTime]>(this.totalFrames$, this.duration$),
    map(([pointerEvent, totalFrames, duration]) => {
      const pointerX = pointerEvent.offsetX;
      const width = this.rect.width;

      const position = (pointerEvent.offsetX <= 0)
        ? 0
        : (pointerX >= width)
          ? width
          : pointerX as TimelinePosition;
  
      return [
        Math.floor(position * totalFrames  / width) as Frame,
        position * duration  / width as VideoTime,
      ] as [Frame, VideoTime]
    }),
  )

  drag$ = this.down$.pipe(switchMapTo(this.move$.pipe(takeUntil(pointerup(this.element))))).pipe(
    this.toFrame,
  );
  
  private subscription = new Subscription();

  constructor(
    private render: Renderer2,
    private elementRef: ElementRef<Element>,
    @Inject(VIDEO_CURRENT_TIME) private readonly currentTime$: Observable<VideoTime>,
    @Inject(VIDEO_TOTAL_FRAMES) private readonly totalFrames$: Observable<Frame>,
    @Inject(VIDEO_DURATION) private readonly duration$: Observable<VideoTime>,
    @Inject(VIDEO_CURRENT_TIME_CHANGE) private readonly currentTimeChange: Subject<VideoTime>,
  ) {
    console.log(`slider created!`);

    this.subscription.add(this.drag$.pipe(
      map(([_, time]) => time)
    ).subscribe((time) => {
      this.currentTimeChange.next(time);
    }));

    this.subscription.add(combineLatest([
      merge(
        this.drag$.pipe(
          map(([_, time]) => time),
        ),
        this.currentTime$,
        // this.player.scroll$,
      ),
      this.duration$]).pipe(
      map(([time, duration]) => ((time / duration * this.rect.width) || 0) as TimelinePosition),
    ).subscribe((translate) => {
      this.render.setAttribute(this.elementRef.nativeElement, 'transform', `translate(${translate})`);
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
