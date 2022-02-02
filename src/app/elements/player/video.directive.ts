import { Directive, ElementRef, Inject } from '@angular/core';

import { VideoElement } from '../../utilities/video/video-element';

/**
 * Слушатели на <video> элементе
 * 
 * [events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events)
 */
@Directive({
  selector: 'video',
})
export class VideoDirective  {
  constructor(
    @Inject(ElementRef) elementRef: ElementRef<HTMLVideoElement>,
    @Inject(VideoElement) videoElement: VideoElement,
  ) {
    videoElement.next(elementRef.nativeElement);
  }
}

