import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { fromEvent, groupBy, map, mergeMap, Observable, Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

import { VideoTime } from '../interfaces/VideoTime';
import { VIDEO_CURRENT_TIME, VIDEO_CURRENT_TIME_CHANGE } from './video-current-time';
import { VIDEO_DURATION } from './video-duration';
import { VIDEO_FPS } from './video-fps';


@Directive({
  selector: '[scroll]',
})
export class ScrollDirective implements OnDestroy {

  element = this.elementRef.nativeElement;

  scroll$ = fromEvent<WheelEvent>(this.element, 'wheel');
  frame$ = this.fps$.pipe(map((fps) => (1 / fps) as VideoTime));

  private readonly subscription = this.scroll$.pipe(
    groupBy((event) => event.deltaY > 0),
    mergeMap((group$) => (group$.key)
      ? this.scrollUp(group$)
      : this.scrollDown(group$)
    ),
  ).subscribe((time) => {
    this.currentTimeChange.next(time);
  })

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
    @Inject(VIDEO_FPS) private readonly fps$: Observable<number>,
    @Inject(VIDEO_CURRENT_TIME) private readonly currentTime$: Observable<VideoTime>,
    @Inject(VIDEO_DURATION) private readonly duration$: Observable<VideoTime>,
    @Inject(VIDEO_CURRENT_TIME_CHANGE) private readonly currentTimeChange: Subject<VideoTime>,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  scrollUp(scroll: Observable<WheelEvent>) {
    return scroll.pipe(
      withLatestFrom(this.frame$, this.currentTime$, this.duration$),
      map(([_, frame, currentTime, duration]) => {
        const nextTime = currentTime + frame as VideoTime;
        return nextTime > duration ? currentTime as VideoTime : nextTime
      }),
    );
  }

  scrollDown(scroll: Observable<WheelEvent>) {
    return scroll.pipe(
      withLatestFrom(this.frame$, this.currentTime$, this.duration$),
      map(([_, frame, currentTime]) => {
        const nextTime = currentTime - frame as VideoTime;
        return nextTime <= 0 ? currentTime as VideoTime : nextTime
      }),
    );
  }

}
