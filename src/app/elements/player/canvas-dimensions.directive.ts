import { Directive, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Dimensions } from 'src/app/interfaces/Dimensions.interface';


@Directive({
  selector: 'canvas[dimensions]'
})
export class CanvasDimensionsDirective implements OnDestroy {

  private subscription!: Subscription;
  private element = this.elementRef.nativeElement;

  @Input('dimensions') set dimensions(dimensions$: Observable<Dimensions>) {
    if (dimensions$) {
      this.subscription?.unsubscribe();
      this.subscription = dimensions$.subscribe(({ height, width }) => {
        this.element.height = height;
        this.element.width = width;
      })
    }
  }

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLCanvasElement>,
  ) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}