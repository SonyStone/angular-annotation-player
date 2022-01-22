import { Directive, ElementRef, Inject } from '@angular/core';

import { Annotations } from '../utilities/layers.store';
import { VideoElement } from '../utilities/video/video-element';

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
    @Inject(ElementRef) readonly elementRef: ElementRef<HTMLVideoElement>,
    @Inject(VideoElement) readonly videoElement: VideoElement,
    @Inject(Annotations) readonly store: Annotations,
  ) {
    videoElement.next(elementRef.nativeElement);
  }
}

