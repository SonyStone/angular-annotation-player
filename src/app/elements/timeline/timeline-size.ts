import { ElementRef, Inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';
import { resizeObservable } from 'src/app/common/resize-observable';
import { Dimensions } from 'src/app/interfaces/Dimensions.interface';

@Injectable()
export class TimelineSize extends Observable<Dimensions> {
  constructor(
    @Inject(ElementRef) elementRef: ElementRef<Element>,
  ) {
    const source = resizeObservable(elementRef.nativeElement).pipe(
      map((entries) => ({
        height: entries[0].contentRect.height,
        width: entries[0].contentRect.width,
      })),
      shareReplay(),
    )

    super((subscriber) => source.subscribe(subscriber));
  }
}