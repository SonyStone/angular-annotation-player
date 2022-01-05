import { Directive, ElementRef, Inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { combineLatest, map, merge, Observable, pipe, shareReplay, Subject, Subscription } from 'rxjs';

import { pointerdrag } from '../../events/pointer';
import { TimelinePosition } from '../../interfaces/TimelinePosition';
import { VideoTime } from '../../interfaces/VideoTime';
import { LayersStore } from '../../utilities/layers.store';
import { VideoService } from '../../utilities/video.service';


@Directive({
  selector: '[slider]'
})
export class SliderDirective implements OnDestroy {

  private element = this.elementRef.nativeElement;

  private width$ = new Subject<number>()
  @Input('width') set width(width: number | undefined) {
    if (width) {
      this.width$.next(width);
    }
  };

  private toFrame = pipe<Observable<[PointerEvent, number, VideoTime]>, Observable<VideoTime>>(
    map(([pointerEvent, width, duration]) => {
      const pointerX = pointerEvent.offsetX;

      const position = (pointerEvent.offsetX <= 0)
        ? 0
        : (pointerX >= width)
          ? width
          : pointerX as TimelinePosition;
  
      return (position * duration  / width) as VideoTime;
    }),
  )

  drag$ = combineLatest([
    pointerdrag(this.element),
    this.width$,
    this.video.duration$
  ]).pipe(
    this.toFrame,
    shareReplay(),
  );

  private subscription = new Subscription();

  constructor(
    private render: Renderer2,
    private elementRef: ElementRef<Element>,
    @Inject(VideoService) private readonly video: VideoService,
    @Inject(LayersStore) private readonly store: LayersStore,
  ) {
    this.subscription.add(this.drag$.subscribe((time) => this.store.setTime(time)));

    this.subscription.add(combineLatest([
      merge(
        this.drag$,
        this.video.currentTime$,
      ),
      this.video.duration$,
      this.width$,
    ]).pipe(
      map(([time, duration, width]) => ((time / duration * width) || 0) as TimelinePosition),
    ).subscribe((translate) => {
      this.render.setAttribute(this.elementRef.nativeElement, 'transform', `translate(${translate})`);
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
