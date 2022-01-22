import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { Dimensions } from '../interfaces/Dimensions.interface';
import { AnnotationsService } from '../utilities/annotations.service';
import { CanvasContext } from '../utilities/canvas/canvas-context';
import { CanvasElement } from '../utilities/canvas/canvas-element';
import { resize } from '../utilities/resize';
import { VideoDimensions } from '../utilities/video/video-dimensions';
import { VideoElement } from '../utilities/video/video-element';

@Directive({
  selector: `canvas[paint]`,
})
export class CanvasPaintDirective implements OnDestroy {


  private subscription = new Subscription();

  constructor(
    elementRef: ElementRef<HTMLCanvasElement>,
    @Inject(CanvasElement) canvasElement: CanvasElement,
    @Inject(CanvasContext) ctx$: CanvasContext,
    @Inject(AnnotationsService) comments: AnnotationsService,
    @Inject(VideoDimensions) dimensions$: VideoDimensions,
    @Inject(VideoElement) videoElement: VideoElement,
  ) {
    const canvas = elementRef.nativeElement;
    canvasElement.next(canvas);

    this.subscription.add(
      combineLatest([ctx$, comments.currentImage$]).subscribe(([ctx, img]) => {
        if (img) {
          ctx.putImageData(img, 0, 0);
        } else {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
      })
    );

    this.subscription.add(
      dimensions$.subscribe((dimensions) => {
        canvas.height = dimensions.height;
        canvas.width = dimensions.width;
      })
    );

    this.subscription.add(
      combineLatest([
        dimensions$,
        resize(videoElement)
      ]).subscribe(([element, video]) => {    
        canvas.style.transform = resizeTo(element, video);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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