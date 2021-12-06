import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { CommentsService } from '../comments/comments.service';
import { CanvasService } from './canvas.service';

@Directive({
  selector: `canvas[paint]`,
})
export class CanvasPaintDirective implements OnDestroy {


  private subscription = new Subscription();

  constructor(
    elementRef: ElementRef<HTMLCanvasElement>,
    @Inject(CanvasService) canvas: CanvasService,
    @Inject(CommentsService) comments: CommentsService
  ) {
    canvas.canvas$.next(elementRef.nativeElement);

    this.subscription.add(
      combineLatest([canvas.ctx$, comments.currentImage$]).subscribe(([ctx, img]) => {
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
