import { Directive, ElementRef, NgModule, OnDestroy, Output } from '@angular/core';
import {
  animationFrameScheduler,
  Connectable,
  connectable,
  fromEvent,
  merge,
  Subscription,
  switchMapTo,
  takeUntil,
  timer,
} from 'rxjs';

@Directive({ selector: '[hold]' })
export class HoldDirective implements OnDestroy {

  @Output('hold') hold: Connectable<number>;

  private subscription: Subscription;

  constructor(
    elementRef: ElementRef<Element>,
  ) {
    const element = elementRef.nativeElement;
    const start$ = fromEvent(element, 'pointerdown');
    const end$ = merge(
      fromEvent(element, 'pointerup'),
      fromEvent(element, 'pointerleave')
    );

    const frameByFrame = start$.pipe(
      switchMapTo(timer(250, 50, animationFrameScheduler).pipe(
        takeUntil(end$),
      )),
    );

    this.hold = connectable(frameByFrame);
    this.subscription = this.hold.connect();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

@NgModule({
  declarations: [HoldDirective],
  exports: [HoldDirective],
})
export class HoldModule { }
