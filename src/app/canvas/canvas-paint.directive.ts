import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { AnnotationsService } from '../utilities/annotations.service';
import { Dimensions, VideoService } from '../utilities/video.service';
import { CanvasService } from '../utilities/canvas.service';

@Directive({
  selector: `canvas[paint]`,
})
export class CanvasPaintDirective implements OnDestroy {


  private subscription = new Subscription();

  constructor(
    elementRef: ElementRef<HTMLCanvasElement>,
    @Inject(CanvasService) canvasService: CanvasService,
    @Inject(AnnotationsService) comments: AnnotationsService,
    @Inject(VideoService) video: VideoService,
  ) {
    const canvas = elementRef.nativeElement;
    canvasService.canvas$.next(canvas);

    this.subscription.add(
      combineLatest([canvasService.ctx$, comments.currentImage$]).subscribe(([ctx, img]) => {
        if (img) {
          ctx.putImageData(img, 0, 0);
        } else {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
      })
    );

    this.subscription.add(
      video.dimensions$.subscribe((dimensions) => {
        canvas.height = dimensions.height;
        canvas.width = dimensions.width;
      })
    );

    this.subscription.add(
      combineLatest([video.dimensions$, video.resize$]).subscribe(([element, video]) => {    
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