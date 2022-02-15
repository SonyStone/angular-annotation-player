import { Inject, Injectable } from '@angular/core';
import {
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
import { VideoCurrentFrame } from 'src/app/utilities/video/video-current-frame';

import { TimelinePosition } from '../../interfaces/TimelinePosition';
import { TimelineRatio } from './timeline-ratio';



/**
 * Slider → CurrentFrame ⇆ TimelinePosition
 */
@Injectable()
export class SliderPosition extends Subject<TimelinePosition> {

  private readonly destination = new Subject<PointerEvent | TimelinePosition>();
  
  private subscription: Subscription;

  constructor(
    @Inject(VideoCurrentFrame) currentFrame$: VideoCurrentFrame,
    @Inject(TimelineRatio) ratio$: TimelineRatio,
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
      currentFrame$.next(frame);
    });

    const frame$: Observable<TimelinePosition> = combineLatest([currentFrame$, ratio$]).pipe(
      map(([frame, ratio]) => ratio.toPosition(frame)),
      shareReplay(),
    );

    this.source = frame$;
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




export function isPosition<T extends number>(value: PointerEvent | T): value is PointerEvent {
  return isNaN(value as any);
}