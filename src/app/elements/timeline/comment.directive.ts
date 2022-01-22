import { Directive, ElementRef, Inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { combineLatest, first, map, merge, pipe, Subject, Subscription, switchMapTo, takeUntil, withLatestFrom } from 'rxjs';
import { VideoTotalFrames } from 'src/app/utilities/video/video-total-frames';

import { pointerdown, pointermove, pointerup } from '../../events/pointer';
import { Frame } from '../../interfaces/Frame';
import { TimelinePosition } from '../../interfaces/TimelinePosition';
import { Annotations } from '../../utilities/layers.store';

const START_OFFEST = 8

@Directive({
  selector: '[comment]'
})
export class CommentDirective implements OnDestroy {

  private width$ = new Subject<number>()
  @Input('width') set width(width: number | undefined | null) {
    if (width) {
      this.width$.next(width);
    }
  };

  frame$ = new Subject<Frame>();
  @Input('comment') set frame(frame: Frame | string) {
    this.frame$.next(frame as Frame);
  };

  private element = this.elementRef.nativeElement;

  private down$ = pointerdown(this.element);
  private move$ = pointermove(this.element);

  private toFrame = pipe(
    withLatestFrom<PointerEvent, [Frame, number]>(this.totalFrames$, this.width$),
    map(([pointerEvent, duration, width]) => {
      const pointerX = pointerEvent.offsetX - START_OFFEST;

      const position = (pointerEvent.offsetX <= 0)
        ? 0
        : (pointerX >= width)
          ? width
          : pointerX as TimelinePosition;
  
      return Math.floor(position * duration / width) as Frame
    }),
  )

  drag$ = this.down$.pipe(switchMapTo(this.move$.pipe(takeUntil(pointerup(this.element))))).pipe(
    this.toFrame,
  );
  
  lastChange$ = this.down$.pipe(
    switchMapTo(pointerup(this.element).pipe(
      first()
    ))).pipe(
    this.toFrame,
  )
  
  private subscription = new Subscription();

  constructor(
    private readonly render: Renderer2,
    private readonly elementRef: ElementRef<Element>,
    @Inject(Annotations) store: Annotations,
    @Inject(VideoTotalFrames) private readonly totalFrames$: VideoTotalFrames,
  ) {
    this.subscription.add(
      this.lastChange$.pipe(
        withLatestFrom(this.frame$),
        map(([drag, frame]) => [frame, drag]),
      ).subscribe(([from, to]) => {
        store.layer.move(from, to);
        // timelineComments.move$.next(data as [Frame, Frame]);
      })
    )

    

    this.subscription.add(
      combineLatest([
        merge(this.drag$, this.frame$), this.totalFrames$, this.width$])
      .pipe(
      map(([time, duration, width]) => ((time / duration * width) || 0) as TimelinePosition),
    ).subscribe((translate) => {
      this.render.setAttribute(this.elementRef.nativeElement, 'transform', `translate(${translate + START_OFFEST})`);
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

