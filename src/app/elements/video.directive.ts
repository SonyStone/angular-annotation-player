import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { merge } from 'rxjs';

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

  // private subscription = merge(
  //   this.store.currentTime$,
  //   this.video.currentTimeChange,
  //   )
  //   .subscribe((currentTime) => {
  //     this.elementRef.nativeElement.currentTime = currentTime;
  //   })

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLVideoElement>,
    @Inject(VideoService) private readonly video: VideoService,
    @Inject(LayersStore) private readonly store: LayersStore,
  ) {
    video.video(elementRef.nativeElement);
  }
}

