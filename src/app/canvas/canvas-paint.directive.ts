import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { combineLatest, Observable, Subject, Subscription } from 'rxjs';

import { COMMENT_CURRENT_IMAGE } from '../comments/comment-current';
import { PlayerService } from '../player.service';
import { CANVAS_CONTEXT } from './canvas-context';
import { CANVAS_ELEMENT } from './canvas-element';

@Directive({
  selector: `canvas[paint]`,
})
export class CanvasPaintDirective implements OnDestroy {


  private subscription = new Subscription();

  constructor(
    elementRef: ElementRef<HTMLCanvasElement>,
    player: PlayerService,
    @Inject(CANVAS_ELEMENT) canvas: Subject<HTMLCanvasElement>,
    @Inject(CANVAS_CONTEXT) ctx$: Observable<CanvasRenderingContext2D>,
    @Inject(COMMENT_CURRENT_IMAGE) currentImage$: Observable<ImageData | undefined>,
  ) {
    canvas.next(elementRef.nativeElement);

    this.subscription.add(
      combineLatest([ctx$, currentImage$]).subscribe(([ctx, img]) => {
        if (img) {
          ctx.putImageData(img, 0, 0);
        } else {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }
      })
    );

    this.subscription.add(
      combineLatest([ctx$, player.clear$]).subscribe(([ctx]) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
