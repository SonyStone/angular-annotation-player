import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { AnnotationsService } from '../annotations/annotations.service';
import { VideoService } from '../video/video.service';
import { CanvasService } from './canvas.service';

@Directive({
  selector: `canvas[paint]`,
})
export class CanvasPaintDirective implements OnDestroy {


  private subscription = new Subscription();

  constructor(
    elementRef: ElementRef<HTMLCanvasElement>,
    @Inject(CanvasService) canvasService: CanvasService,
    @Inject(AnnotationsService) comments: AnnotationsService,
    @Inject(VideoService) private readonly video: VideoService,
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
    // this.subscription.add(
    //   combineLatest([ctx$, player.clear$]).subscribe(([ctx]) => {
    //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    //   })
    // )

    this.subscription.add(
      combineLatest([video.dimensions$, video.resize$]).subscribe(([dimensions, resize]) => {
        const scaleX = resize.width / dimensions.width;
        const x = (resize.width - dimensions.width) / 2;
    
        const scaleY = resize.height / dimensions.height;
        const y = (resize.height - dimensions.height) / 2;
    
        canvas.style.transform = `matrix(${scaleX}, 0, 0, ${scaleY}, ${x}, ${y})`
      })
    );

    this.subscription.add(
      video.dimensions$.subscribe((dimensions) => {
        canvas.height = dimensions.height;
        canvas.width = dimensions.width;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
