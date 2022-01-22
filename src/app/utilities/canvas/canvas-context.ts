import { Inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { CanvasElement } from './canvas-element';

@Injectable()
export class CanvasContext extends Observable<CanvasRenderingContext2D> {
  constructor(
    @Inject(CanvasElement) canvas$: CanvasElement,
  ) {
    const source = canvas$.pipe(
      map((canvas) => canvas.getContext('2d')!),
      shareReplay(),
    )

    super((subscriber) => source.subscribe(subscriber));
  }
}