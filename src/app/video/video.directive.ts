import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { VideoTime } from '../interfaces/VideoTime';
import { VIDEO_CURRENT_TIME_CHANGE } from './video-current-time';
import { VIDEO_ELEMENT } from './video-element';

/**
 * Слушатели на <video> элементе
 * 
 * [events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events)
 */
@Directive({
  selector: 'video',
  exportAs: 'video',
})
export class VideoDirective implements OnDestroy {

  video = this.elementRef.nativeElement;


  private subscription = this.currentTimeChange
    .subscribe((currentTime) => {
      this.video.currentTime = currentTime;
    })


  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLVideoElement>,
    @Inject(VIDEO_ELEMENT) video: ReplaySubject<HTMLVideoElement>,
    @Inject(VIDEO_CURRENT_TIME_CHANGE) private readonly currentTimeChange: Observable<VideoTime>,
  ) {
    video.next(elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }
}

