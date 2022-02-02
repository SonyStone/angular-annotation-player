import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Dimensions } from 'src/app/interfaces/Dimensions.interface';
import { resize } from 'src/app/utilities/resize';
import { VideoDimensions } from 'src/app/utilities/video/video-dimensions';
import { VideoElement } from 'src/app/utilities/video/video-element';

@Injectable()
export class CanvasTransform extends Observable<string> {
  constructor(
    @Inject(VideoDimensions) dimensions$: VideoDimensions,
    @Inject(VideoElement) videoElement: VideoElement,
  ) {
    const source = combineLatest([
      dimensions$,
      resize(videoElement)
    ]).pipe(
      map(([dimensions, videoSize]) => resizeTo(dimensions, videoSize))
    );

    super((subscriber) => source.subscribe(subscriber));
  }
  
}

/** изменение размера `target` под размер `from` */
function resizeTo(target: Dimensions, from: Dimensions): string {

  const scaleX = from.width / target.width;
  const skewY = 0;
  const skewX = 0;
  const scaleY = from.height / target.height;
  const translateX = (from.width - target.width) / 2;
  const translateY = (from.height - target.height) / 2;

  return `matrix(${scaleX}, ${skewY}, ${skewX}, ${scaleY}, ${translateX}, ${translateY})`
}