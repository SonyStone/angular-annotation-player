import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { fromEvent, map } from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { OffsetByFrame } from '../utilities/actions/offset-by-frame';


@Directive({
  selector: '[scroll]',
})
export class ScrollDirective implements OnDestroy {

  element = this.elementRef.nativeElement;

  scroll$ = fromEvent<WheelEvent>(this.element, 'wheel');

  private readonly subscription = this.scroll$.pipe(
    map((event) => ((event.deltaY > 0) ? 1 : -1) as Frame),
  ).subscribe((frame) => {
    this.offsetByFrame.next(frame);
  })

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
    @Inject(OffsetByFrame) private readonly offsetByFrame: OffsetByFrame,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
