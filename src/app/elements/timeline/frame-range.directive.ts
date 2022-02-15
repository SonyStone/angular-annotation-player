import { Component, Directive, Inject, Injectable, Input, OnDestroy, Output } from '@angular/core';
import {
  combineLatest,
  connectable,
  distinctUntilChanged,
  map,
  Observable,
  ReplaySubject,
  shareReplay,
  Subject,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { windowBy } from 'src/app/common/window-by';
import { Frame } from 'src/app/interfaces/Frame';
import { TimelinePosition } from 'src/app/interfaces/TimelinePosition';

import { TimelineRatio } from './timeline-ratio';


@Directive({
  selector: '[frameRange]',
  exportAs: 'frameRange',
})
export class FrameRangeDirective implements OnDestroy {

  private keyframes = new ReplaySubject<[Frame, Frame]>();

  readonly positions = new Positions(this.ratio$, this.keyframes);

  @Input('frameRange') set frame(value: [Frame, Frame]) {
    this.keyframes.next(value);
  }
  @Output() frameChange = connectable(this.keyframes)

  private subscription = this.frameChange.connect();

  constructor(
    @Inject(TimelineRatio) private ratio$: TimelineRatio,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

@Injectable()
export class Keyframes extends ReplaySubject<[Frame, Frame]> {
  constructor() {
    super();
  }
}

type TimelineRange = [TimelinePosition, TimelinePosition]

@Injectable()
export class Positions extends Observable<TimelineRange> {

  private readonly all$: Subject<PointerEvent>;
  private readonly first$: Subject<PointerEvent>;
  private readonly last$: Subject<PointerEvent>;

  constructor(
    @Inject(TimelineRatio) ratio$: TimelineRatio,
    @Inject(Keyframes) keyframes$: Subject<[Frame, Frame]>,
  ) {
    const positions = [0, 0] as TimelineRange;
    
    const source = combineLatest([keyframes$, ratio$]).pipe(
      map(([frames, ratio]) => {
        for (let i = 0; i < positions.length; i++) {
          positions[i] = ratio.toPosition(frames[i]);
        }
        
        return [...positions] as TimelineRange;
      }),
      shareReplay(),
    );
    
    let acc = 0 as TimelinePosition;
    const tempPositions = [0, 0] as TimelineRange;
    const offsetPositions = [0, 0] as TimelineRange;

    const all$ = new Subject<PointerEvent>();
    const first$ = new Subject<PointerEvent>();
    const last$ = new Subject<PointerEvent>();
    
    const all = all$.pipe(
      windowBy((event) => event.type === 'pointerdown'),
      switchMap((event$) => event$.pipe(
        tap((event) => {
          if (event.type === 'pointerdown') {
            for (let i = 0; i < positions.length; i++) {
              tempPositions[i] = positions[i];
            }
            acc = event.offsetX as TimelinePosition;
          }
        }),
        map(({ offsetX }) => offsetX - acc),
        distinctUntilChanged(),
        map((offset) => {
          for (let i = 0; i < positions.length; i++) {
            offsetPositions[i] = tempPositions[i] + offset as TimelinePosition;
          }
          return offsetPositions as TimelineRange;
        }),
        )),
        withLatestFrom(ratio$),
        
      map(([positions, ratio]) => [
        ratio.toFrame(positions[0]),
        ratio.toFrame(positions[1]),
      ] as [Frame, Frame]),
      shareReplay(),
    ).subscribe((v) => {
      keyframes$.next(v);
    });

    super((subscriber) => source.subscribe(subscriber).add(all));

    this.all$ = all$;
    this.first$ = first$;
    this.last$ = last$;
  }

  all(value: PointerEvent): void {
    this.all$.next(value);
  }
  first(value: PointerEvent): void {
    this.first$.next(value);
  }
  last(value: PointerEvent): void {
    this.last$.next(value);
  }
}

function offset(pointer$: Observable<PointerEvent>, positions$: Observable<TimelineRange>) {
  let point = 0 as TimelinePosition;
  let positions: TimelineRange;

  return pointer$.pipe(
    windowBy((event) => {
      if(event.type === 'pointerdown') {
        point = event.offsetX as TimelinePosition;
        return true;
      } else {
        return false;
      }
    }),
    switchMap((event$) => event$.pipe(
      map(({ offsetX }) => offsetX - point),
      distinctUntilChanged(),
    )),
    map((offset) => [
      positions[0] + offset,
      positions[1] + offset,
    ] as TimelineRange),
  );
}