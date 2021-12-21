import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { fromEvent, groupBy, map, mergeMap, Observable } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { Frame } from '../interfaces/Frame';

import { VideoTime } from '../interfaces/VideoTime';
import { LayersStore } from '../utilities/layers.store';
import { VideoService } from '../utilities/video.service';


@Directive({
  selector: '[scroll]',
})
export class ScrollDirective implements OnDestroy {

  element = this.elementRef.nativeElement;

  scroll$ = fromEvent<WheelEvent>(this.element, 'wheel');

  private readonly subscription = this.scroll$.pipe(
    map((event) => ((event.deltaY > 0) ? 1 : -1) as Frame),
    // groupBy((event) => event.deltaY > 0),
    // mergeMap((group$) => (group$.key)
    //   ? this.scrollUp(group$)
    //   : this.scrollDown(group$)
    // ),
  ).subscribe((frame) => {
    this.video.moveByFrame$.next(frame)
    // this.video.currentTimeChange$.next(time);
  })

  constructor(
    @Inject(VideoService) private readonly video: VideoService,
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private scrollUp(scroll: Observable<WheelEvent>) {
    return scroll.pipe(
      withLatestFrom(this.video.frameSize$, this.video.currentTime$, this.video.duration$),
      map(([_, frame, currentTime, duration]) => {
        const nextTime = currentTime + frame as VideoTime;
        return nextTime > duration ? currentTime as VideoTime : nextTime
      }),
    );
  }

  private scrollDown(scroll: Observable<WheelEvent>) {
    return scroll.pipe(
      withLatestFrom(this.video.frameSize$, this.video.currentTime$, this.video.duration$),
      map(([_, frame, currentTime]) => {
        const nextTime = currentTime - frame as VideoTime;
        return nextTime <= 0 ? currentTime as VideoTime : nextTime
      }),
    );
  }

}
