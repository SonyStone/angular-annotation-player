import { Inject, Injectable } from '@angular/core';
import { groupBy, map, mergeMap, Observable, shareReplay, Subject, Subscriber, Subscription, withLatestFrom } from 'rxjs';
import { TimelinePosition } from 'src/app/interfaces/TimelinePosition';

import { TimelineWidth } from './timeline-width';

const START_OFFEST = 8

@Injectable()
export class SliderDrag extends Subject<TimelinePosition> {

  private readonly destination = new Subject<PointerEvent | TimelinePosition>()

  constructor(
    @Inject(TimelineWidth) width$: TimelineWidth,
  ) {
    super();

    const source = this.destination.pipe(
      groupBy((value) => isPosition(value)),
      mergeMap((group$) => group$.key
        ? (group$ as Observable<PointerEvent>).pipe(
          map(({ offsetX }) => offsetX - START_OFFEST),
          withLatestFrom(width$),
          map(([pointerX, width]) => clip(pointerX, width - 16)),
        )
        : (group$ as Observable<TimelinePosition>)
      ),
      shareReplay(),
    )

    this.source = source;
  }

  next(value: PointerEvent | TimelinePosition): void {
    this.destination.next(value);
  }

  error(err: any): void {
    this.destination.error(err);
  }

  complete(): void {
    this.destination.complete();
  }

  /** @internal */
  protected _subscribe(subscriber: Subscriber<TimelinePosition>): Subscription {
    return this.source?.subscribe(subscriber) ?? Subscription.EMPTY;
  }
}

export function isPosition<T extends number>(value: PointerEvent | T): value is PointerEvent {
  return isNaN(value as any);
}

export function clip<T extends number>(point: T, range: T): T {  
  return (point <= 0)
    ? 0 as T
    : (point >= range)
      ? range
      : point;
}