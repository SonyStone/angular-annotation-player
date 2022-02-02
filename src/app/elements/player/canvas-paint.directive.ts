import { Directive, ElementRef, Inject } from '@angular/core';

import { CanvasElement } from '../../utilities/canvas/canvas-element';

@Directive({
  selector: `canvas`,
})
export class CanvasDirective {

  constructor(
    elementRef: ElementRef<HTMLCanvasElement>,
    @Inject(CanvasElement) canvasElement: CanvasElement,
  ) {
    canvasElement.next(elementRef.nativeElement);
  }
}
