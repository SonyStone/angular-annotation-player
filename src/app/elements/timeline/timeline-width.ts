import { Inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { TimelineSize } from './timeline-size';


@Injectable()
export class TimelineWidth extends Observable<number> {
  constructor(
    @Inject(TimelineSize) size$: TimelineSize,
  ) {
    const source = size$.pipe(
      map(({ width }) => width),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}