import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { fromEvent, groupBy, map, mergeMap, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { VideoTime } from '../interfaces/VideoTime';
import { VideoService } from './video.service';


@Directive({
  selector: '[scroll]',
})
export class ScrollDirective implements OnDestroy {

  element = this.elementRef.nativeElement;

  scroll$ = fromEvent<WheelEvent>(this.element, 'wheel');

  private readonly subscription = this.scroll$.pipe(
    groupBy((event) => event.deltaY > 0),
    mergeMap((group$) => (group$.key)
      ? this.scrollUp(group$)
      : this.scrollDown(group$)
    ),
  ).subscribe((time) => {
    this.video.currentTimeChange$.next(time);
  })

  constructor(
    @Inject(VideoService) private readonly video: VideoService,
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scrollUp(scroll: Observable<WheelEvent>) {
    return scroll.pipe(
      withLatestFrom(this.video.frameSize$, this.video.currentTime$, this.video.duration$),
      map(([_, frame, currentTime, duration]) => {
        const nextTime = currentTime + frame as VideoTime;
        return nextTime > duration ? currentTime as VideoTime : nextTime
      }),
    );
  }

  scrollDown(scroll: Observable<WheelEvent>) {
    return scroll.pipe(
      withLatestFrom(this.video.frameSize$, this.video.currentTime$, this.video.duration$),
      map(([_, frame, currentTime]) => {
        const nextTime = currentTime - frame as VideoTime;
        return nextTime <= 0 ? currentTime as VideoTime : nextTime
      }),
    );
  }

}
