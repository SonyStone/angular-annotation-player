import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';

import { VideoService } from './video.service';

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

  private subscription = this.video.currentTimeChange$
    .subscribe((currentTime) => {
      this.elementRef.nativeElement.currentTime = currentTime;
    })

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLVideoElement>,
    @Inject(VideoService) private readonly video: VideoService,
  ) {
    video.video$.next(elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  play() {
    this.elementRef.nativeElement.play();
  }

  pause() {
    this.elementRef.nativeElement.pause();
  }
}

