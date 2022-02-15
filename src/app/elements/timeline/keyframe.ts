import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  groupBy,
  map,
  mergeMap,
  Observable,
  shareReplay,
  Subject,
  Subscriber,
  Subscription,
  withLatestFrom,
} from 'rxjs';
import { Frame } from 'src/app/interfaces/Frame';

import { TimelinePosition } from '../../interfaces/TimelinePosition';
import { TimelineRatio } from './timeline-ratio';

@Injectable()
export class Keyframe extends BehaviorSubject<Frame> {
  constructor() {
    super(1 as Frame)
  }
}

/**
 * Position → CurrentFrame ⇆ TimelinePosition
 */
@Injectable()
export class Position extends Subject<TimelinePosition> {

  private readonly destination = new Subject<PointerEvent | TimelinePosition>();
  
  private subscription: Subscription;

  constructor(
    @Inject(TimelineRatio) ratio$: TimelineRatio,
    @Inject(Keyframe) keyframe$: Subject<Frame>,
  ) {
    super();

    const drag$: Observable<Frame> = this.destination.pipe(
      groupBy((value) => isPosition(value)),
      mergeMap((group$) => group$.key
        ? (group$ as Observable<PointerEvent>).pipe(
          map(({ offsetX }) => offsetX as TimelinePosition),
        )
        : (group$ as Observable<TimelinePosition>)
      ),
      withLatestFrom(ratio$),
      map(([position, ratio]) => ratio.toFrame(position)),
      distinctUntilChanged(),
      shareReplay(),
    );

    this.subscription = drag$.subscribe((frame) => {
      keyframe$.next(frame);
    });

    const position$: Observable<TimelinePosition> = combineLatest([keyframe$, ratio$]).pipe(
      map(([frame, ratio]) => ratio.toPosition(frame)),
      shareReplay(),
    );

    this.source = position$;
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
  protected _subscribe(subscriber: Subscriber<number>): Subscription {
    const subscription = this.source?.subscribe(subscriber) ?? Subscription.EMPTY;

    subscription.add(this.subscription);

    return subscription;
  }
}


export function isPosition<T>(value: PointerEvent | T): value is PointerEvent {
  return isNaN(value as any);
}
