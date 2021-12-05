import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import {
  combineLatest,
  first,
  map,
  merge,
  pipe,
  Subject,
  Subscription,
  switchMapTo,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';

import { pointerdown, pointermove, pointerup } from '../events/pointer';
import { Frame } from '../interfaces/Frame';
import { TimelinePosition } from '../interfaces/TimelinePosition';
import { PlayerService } from '../player.service';
import { TimelineComponent } from './timeline.component';


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
    withLatestFrom<PointerEvent, [Frame, DOMRect]>(this.player.totalFrames$, this.rect$),
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
    private readonly player: PlayerService,
    private readonly timeline: TimelineComponent,
    private readonly render: Renderer2,
    private readonly elementRef: ElementRef<Element>,
  ) {
    console.log(`comment created!`);

    this.timeline.lastMove.next(this.lastChange$.pipe(
      withLatestFrom(this.frame$),
      map(([drag, frame]) => [frame, drag]),
    ))

    this.subscription.add(
      combineLatest([
        merge(this.drag$, this.frame$), this.player.totalFrames$, this.rect$])
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

