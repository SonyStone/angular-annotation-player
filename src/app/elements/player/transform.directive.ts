import { Directive, ElementRef, Inject, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';


/**
 * Такой способ предпочтительнии, так как у `push` pipe имееться лаг.
 */
@Directive({
  selector: '[transform]'
})
export class TransformDirective implements OnDestroy {

  private subscription!: Subscription;
  private element = this.elementRef.nativeElement;

  @Input('transform') set transform(transform$: Observable<string>) {
    if (transform$) {
      this.subscription?.unsubscribe();
      this.subscription = transform$.subscribe((transform) => {
        this.element.style.transform = transform;
      })
    }
  }

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
  ) { }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}