import { Directive, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';


@Directive({
  selector: '[.width]'
})
export class WidthDirective implements OnDestroy {

  private subscription!: Subscription;
  private element = this.elementRef.nativeElement;

  @Input('.width') set width(width$: Observable<number>) {
    if (width$) {
      this.subscription?.unsubscribe();
      this.subscription = width$.subscribe((width) => {
        this.element.setAttribute("width", `${width}`);
      })
    }
  }

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLCanvasElement>,
  ) {}

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}