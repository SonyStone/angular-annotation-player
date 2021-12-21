import { Directive, ElementRef, Inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { combineLatest, first, map, merge, pipe, Subject, Subscription, switchMapTo, takeUntil, withLatestFrom } from 'rxjs';

import { pointerdown, pointermove, pointerup } from '../../events/pointer';
import { Frame } from '../../interfaces/Frame';
import { TimelinePosition } from '../../interfaces/TimelinePosition';
import { VideoService } from '../../utilities/video.service';
import { TimelineCommentsService } from '../../utilities/timeline-comment-store';
import { LayersStore } from '../../utilities/layers.store';


@Directive({
  selector: '[comment]'
})
export class CommentDirective implements OnDestroy {

  rect$ = new Subject<DOMRect>();
  @Input() set rect(rect: DOMRect) {
    this.rect$.next(rect);
  };

  frame$ = new Subject<Frame>();
  @Input('comment') set frame(frame: Frame | string) {
    this.frame$.next(frame as Frame);
  };

  private element = this.elementRef.nativeElement;

  private down$ = pointerdown(this.element);
  private move$ = pointermove(this.element);

  private toFrame = pipe(
    withLatestFrom<PointerEvent, [Frame, DOMRect]>(this.video.totalFrames$, this.rect$),
    map(([pointerEvent, duration, rect]) => {
      const pointerX = pointerEvent.offsetX;
      const width = rect.width;

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
    @Inject(TimelineCommentsService) readonly timelineComments: TimelineCommentsService,
    @Inject(VideoService) private readonly video: VideoService,
    @Inject(LayersStore) store: LayersStore,
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
        merge(this.drag$, this.frame$), this.video.totalFrames$, this.rect$])
      .pipe(
      map(([time, duration, rect]) => ((time / duration * rect.width) || 0) as TimelinePosition),
    ).subscribe((translate) => {
      this.render.setAttribute(this.elementRef.nativeElement, 'transform', `translate(${translate})`);
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

