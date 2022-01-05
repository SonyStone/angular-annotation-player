import { Directive, ElementRef, Inject, SkipSelf } from '@angular/core';
import { of, tap } from 'rxjs';
import { resize } from '../../utilities/resize';

@Directive({ selector: 'svg[resize]' })
export class ResizeDirective {
  constructor(
    @Inject(ElementRef) element: ElementRef<SVGElement>,
    @SkipSelf() @Inject(ElementRef) container: ElementRef<Element>,
  ) {
    resize(of(container.nativeElement)).pipe(
      tap((v) => { console.log(`log-name`, v); }),
    ).subscribe(({ height, width}) => {
      element.nativeElement.setAttribute("viewBox", `0 0 ${width} ${height}`); 
    })
  }
}