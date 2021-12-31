import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[timeline]',
  exportAs: 'timeline'
})
export class TimelineDirective {

  rect: DOMRect = this.element.nativeElement.getBBox();

  constructor(
    private readonly element: ElementRef<SVGRectElement>
  ) {
  }
}