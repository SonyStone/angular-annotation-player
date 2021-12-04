import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: `canvas[context2d]`,
  exportAs: 'canvas',
})
export class CanvasContext2dDirective {

  @Input() set image(img: ImageData | null) {
    if (img) {
      this.ctx.putImageData(img, 0, 0)
    }
  }

  canvas = this.elementRef.nativeElement;
  ctx = this.canvas.getContext('2d')!;

  constructor(
    private readonly elementRef: ElementRef<HTMLCanvasElement>,
  ) {
    this.canvas.height = this.canvas.offsetHeight;
    this.canvas.width = this.canvas.offsetWidth;
  }
}
