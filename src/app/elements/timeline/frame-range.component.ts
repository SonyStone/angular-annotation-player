import { ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, Output } from '@angular/core';
import { combineLatest, connectable, distinctUntilChanged, filter, map, OperatorFunction, pipe, scan, shareReplay, Subject, switchMap, tap, withLatestFrom } from 'rxjs';
import { windowBy } from 'src/app/common/window-by';
import { Frame } from 'src/app/interfaces/Frame';
import { TimelinePosition } from 'src/app/interfaces/TimelinePosition';
import { Keyframes, Positions } from './frame-range.directive';
import { TimelineRatio } from './timeline-ratio';

type TimelineRange = [TimelinePosition, TimelinePosition]

@Component({
  selector: 'g[frame-range]',
  templateUrl: 'frame-range.component.html',
  styleUrls: ['frame-range.component.scss'],
  providers: [
    Keyframes,
    Positions,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrameRangeComponent implements OnDestroy {

  @Input('frame-range') set frame(value: [Frame, Frame]) {
    this.keyframes$.next(value);
  }
  @Output() frameChange = connectable(this.keyframes$)

  private subscription = this.frameChange.connect();


  all$ = new Subject<PointerEvent>();

  constructor(
    @Inject(Keyframes) readonly keyframes$: Keyframes,
    @Inject(Positions) readonly positions$: Positions,
    @Inject(TimelineRatio) ratio$: TimelineRatio,
  ) {

    let positions: TimelineRange;

    combineLatest([keyframes$, ratio$]).pipe(
      map(([frames, ratio]) => ratio.toPositions(frames) as TimelineRange),
      // tap((v) => { console.log(`1`, v); }),
      shareReplay(),
    ).subscribe((v) => {
      positions = v;
    })

    combineLatest([
      this.all$.pipe(
        accumulateOffset(),
      ),
      this.all$.pipe(
        filter(({ type }) => type === 'pointerdown'),
        map(() => positions),
      ),
    ]).pipe(
      offestPositions(),
      // tap((v) => { console.log(`log-name-2`, v); }),
      withLatestFrom(ratio$),
      map(([positions, ratio]) => ratio.toFrames(positions) as [Frame, Frame]),
      tap((v) => { console.log(`3`, v); }),
    )
    .subscribe((v) => {
      this.keyframes$.next(v);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  all(value: PointerEvent): void {
    // this.all$.next(value);
  }

  first(value: PointerEvent): void {
    // this.first$.next(value);
  }
  last(value: PointerEvent): void {
    // this.last$.next(value);
  }

  test(value: any): void {
    console.log(value);
  }
}


function offestPositions(): OperatorFunction<[number, TimelineRange], TimelineRange> {
  const offsetPositions = [0,0] as TimelineRange;

  return map(([offset, positions]) => {
    for (let i = 0; i < positions.length; i++) {
      offsetPositions[i] = positions[i] + offset as TimelinePosition;
    }
    return offsetPositions as TimelineRange;
  });
}

function accumulateOffset(): OperatorFunction<PointerEvent, TimelinePosition> {
  let accumulator = 0 as TimelinePosition;
  return map((event) => {
    if (event.type === 'pointerdown') {
      accumulator = event.offsetX as TimelinePosition;
    }
    return event.offsetX - accumulator as TimelinePosition;
  });
}

