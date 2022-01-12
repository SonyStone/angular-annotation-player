import { Directive, ElementRef, Inject } from '@angular/core';

import { LayersStore } from '../utilities/layers.store';
import { VideoService } from '../utilities/video.service';

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
    @Inject(VideoService) readonly video: VideoService,
    @Inject(LayersStore) readonly store: LayersStore,
  ) {
    video.video$.next(elementRef.nativeElement);
  }
}

