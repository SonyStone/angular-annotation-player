import { Directive, ElementRef, Inject, NgModule, OnDestroy, Output } from '@angular/core';
import { connectable, filter, fromEvent } from 'rxjs';


@Directive({
  selector: '[scrollUp]',
})
export class ScrollUpDirective implements OnDestroy {

  element = this.elementRef.nativeElement;

  scroll$ = fromEvent<WheelEvent>(this.element, 'wheel');

  @Output('scrollUp') scrollUp = connectable(this.scroll$.pipe(
    filter((event) => (event.deltaY > 0),
  )));

  private readonly subscription = this.scrollUp.connect();

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

@Directive({
  selector: '[scrollDown]',
})
export class ScrollDownDirective implements OnDestroy {

  element = this.elementRef.nativeElement;

  scroll$ = fromEvent<WheelEvent>(this.element, 'wheel');

  @Output('scrollDown') scrollDown = connectable(this.scroll$.pipe(
    filter((event) => (event.deltaY < 0),
  )));

  private readonly subscription = this.scrollDown.connect();

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

@NgModule({
  declarations: [
    ScrollDownDirective,
    ScrollUpDirective,
  ],
  exports: [
    ScrollDownDirective,
    ScrollUpDirective,
  ],
})
export class ScrollModule { }
