import { Inject, Injectable } from '@angular/core';
import {
  combineLatest,
  distinctUntilChanged,
  groupBy,
  map,
  merge,
  mergeMap,
  Observable,
  shareReplay,
  startWith,
  Subject,
  Subscriber,
  Subscription,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Frame } from 'src/app/interfaces/Frame';
import { VideoCurrentFrame } from 'src/app/utilities/video/video-current-frame';
import { VideoTotalFrames } from 'src/app/utilities/video/video-total-frames';

import { TimelinePosition } from '../../interfaces/TimelinePosition';
import { TimelineWidth } from './timeline-width';


const START_OFFEST = 8

/**
 * Slider → CurrentFrame ⇆ TimelinePosition
 */
@Injectable()
export class SliderPosition extends Subject<TimelinePosition> {

  private readonly destination = new Subject<PointerEvent | TimelinePosition>();
  
  private subscription: Subscription;

  constructor(
    @Inject(VideoCurrentFrame) currentFrame$: VideoCurrentFrame,
    @Inject(TimelineWidth) width$: TimelineWidth,
    @Inject(VideoTotalFrames) totalFrames$: VideoTotalFrames,
  ) {
    super();

    const drag$: Observable<Frame> = this.destination.pipe(
      groupBy((value) => isPosition(value)),
      mergeMap((group$) => group$.key
        ? (group$ as Observable<PointerEvent>).pipe(
          map(({ offsetX }) => offsetX - START_OFFEST),
          withLatestFrom(width$),
          map(([pointerX, width]) => clip(pointerX, width - 16) as TimelinePosition),
        )
        : (group$ as Observable<TimelinePosition>)
      ),
      withLatestFrom(totalFrames$, width$),
      map(([position, totalFrames, width]) => Math.round(position * totalFrames  / (width - 16)) as Frame),
      distinctUntilChanged(),
      shareReplay(),
    );

    const frame$: Observable<TimelinePosition> = combineLatest([
      merge(currentFrame$, drag$),
      totalFrames$,
      width$,
    ]).pipe(
      map(([frame, totalFrames, width]) => ((frame / totalFrames * (width - 16)) || 0) as TimelinePosition),
      startWith(0),
      map((translate) => translate + START_OFFEST as TimelinePosition),
      shareReplay(),
    );

    this.source = frame$;
    this.subscription = drag$.subscribe((frame) => {
      currentFrame$.next(frame);
    });
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

export function clip<T extends number>(point: T, range: T): T {  
  return (point <= 0)
    ? 0 as T
    : (point >= range)
      ? range
      : point;
}