import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  groupBy,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  OperatorFunction,
  pairwise,
  pipe,
  ReplaySubject,
  scan,
  shareReplay,
  startWith,
  Subscriber,
  Subscription,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { windowBy } from 'src/app/common/window-by';
import { Frame } from 'src/app/interfaces/Frame';
import { VideoTotalFrames } from 'src/app/utilities/video/video-total-frames';
import { isPosition } from './slider';

import { TimelineWidth } from './timeline-width';

class TimelinePositionConvertor {
  static set(totalFrames: Frame, width: number, convertor?: TimelinePositionConvertor): TimelinePositionConvertor {
    if (convertor) {
      convertor.totalFrames = totalFrames;
      convertor.width = width;
      return convertor;
    } else {
      return new TimelinePositionConvertor(totalFrames, width);
    }
  }

  constructor(
    private totalFrames: Frame,
    private width: number,
  ) {}

  to(frame: Frame | number): number {
    return ((frame / this.totalFrames * (this.width - 16)) || 0); //as TimelinePosition;
  }

  toKeys<T extends number[]>(frames: Frame[]): T {
    return frames.map((frame) => this.to(frame)) as T;
  }

  from(translate: number): Frame {
    console.log(`translate`, translate);
    return Math.floor(((translate - 8) / (this.width - 16) * this.totalFrames) || 0) as Frame;
  }
}



@Injectable()
export class TimelinePositionHandler extends Observable<TimelinePositionConvertor> {
  constructor(
    @Inject(VideoTotalFrames) totalFrames$: VideoTotalFrames,
    @Inject(TimelineWidth) width$: TimelineWidth,
  ) {
    let convertor: TimelinePositionConvertor;

    const source = combineLatest([totalFrames$, width$]).pipe(
      map(([totalFrames, width]) => TimelinePositionConvertor.set(totalFrames, width, convertor)),
      shareReplay(1),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}


@Injectable()
export class KeyframesSource extends AnonymousSubject<[Frame, Frame][]> {
  constructor(
    
  ) {
    const destination = new BehaviorSubject<[Frame, Frame][]>([
      [3, 5],
      [40, 90],
      [120, 200],
      [220, 300],
      [1000, 1300],
    ] as [Frame, Frame][]);
    const source = destination.pipe(
      shareReplay(1),
    );

    super(destination, source);
  }
}



@Injectable()
export class Keyframes extends Observable<KeyframesMove[]> {

  frame: Subject<Frame>;

  constructor(
    @Inject(KeyframesSource) keyframes$: KeyframesSource,
    @Inject(VideoTotalFrames) totalFrames$: VideoTotalFrames,
    @Inject(TimelineWidth) width$: TimelineWidth,
  ) {

    const array: KeyframesMove[] = [];

    width$ = width$.pipe(map((width) => width - 16));

    const c$ = combineLatest([width$, totalFrames$]).pipe(
      map(([width, totalFrames]) => width / totalFrames),
    );

    const source = keyframes$.pipe(
      map((keyframes) => {
        for (let index = 0; index < keyframes.length; index++) {
          const keyframe = keyframes[index];

          array[index] = KeyframesMove.update(array[index], keyframe, c$);
        }

        return array; 
      }),
    )

    super((subscriber) => source.subscribe(subscriber));

    const frame$ = new Subject<Frame>();
    this.frame = frame$;
  }
}


export class TimelineKeyframe extends Subject<[number, number]> {
  destination = new Subject<[Frame, Frame]>();

  constructor(
    width$: TimelineWidth,
  ) {
    super();
    const source = combineLatest([this.destination, width$]).pipe(
      map(([keyframe, width]) => keyframe.map((k) => k * width) as [number, number]),
      shareReplay(),
    )

    this.source = source;
  }

  next(value: [Frame, Frame]): void {
    this.destination.next(value);
  }

  error(err: any): void {
    this.destination.error(err);
  }

  complete(): void {
    this.destination.complete();
  }

  protected _subscribe(subscriber: Subscriber<any>): Subscription {
    return this.source?.subscribe(subscriber) ?? Subscription.EMPTY;
  }
}

export class KeyframesMove extends Subject<[number, number]> {

  static update(self: KeyframesMove | undefined, keyframe: [Frame, Frame], width$: TimelineWidth): KeyframesMove {
    const obj = self ?? new KeyframesMove(width$);
    obj.set(keyframe);
    return obj;
  }

  private frames$ = new TimelineKeyframe(this.width$);
  private destination = new ReplaySubject<[number, number]>(1);
  private pointer = new Subject<PointerEvent | number>();
  private pointer$ = this.pointer.pipe(
    groupBy((value) => isPosition(value)),
    mergeMap((group$) => group$.key
      ? (group$ as Observable<PointerEvent>).pipe(
        windowBy((event) => event.type === 'pointerdown'),
        switchMap((event) => event.pipe(
          offset2(),
        )),
      )
      : (group$ as Observable<number>)
    ),
  )

  key: number | undefined = undefined;
  
  constructor(
    private width$: TimelineWidth,
  ) {
    super();

    this.frames$.subscribe((v) => {
      this.next(v)
    })

    const move$ = this.pointer$.pipe(
      withLatestFrom(this.destination, width$),
      map(([offset, keyframe, width]) => keyframe.map((k) => Math.round((k + offset) / width)) as [Frame, Frame]),
      tap((v) => { console.log(`log-name`, v); }),
    );

    move$.subscribe((v) => {
      this.frames$.next(v)
    })
  
    const source = this.destination;

    this.source = source;
  }

  set(value: [Frame, Frame]): void {
    this.frames$.next(value);
  }

  next(value: [number, number]): void {
    this.destination.next(value);
  }

  error(err: any): void {
    this.destination.error(err);
  }

  complete(): void {
    this.destination.complete();
  }

  move(pointer: PointerEvent, key?: number): void {
    this.key = key;
    this.pointer.next(pointer);
  }

  protected _subscribe(subscriber: Subscriber<any>): Subscription {
    return this.source?.subscribe(subscriber) ?? Subscription.EMPTY;
  }
}

function offsetAll<T extends number[]>(keyframe: T): OperatorFunction<number, T> {
  return map((offset) => keyframe.map((k) => k + offset) as T);
}

function offsetKey<T extends number>(keyframe: T): OperatorFunction<T, T> {
  return map((offset) => keyframe + offset as T);
}


function offsetAllOrKey<T extends number[]>(keyframe: T, key: number | undefined): OperatorFunction<number, T> {
  console.log(`offsetAllOrKey`)
  return map((offset) => {
    const p = [...keyframe] as T;
    
    if (key !== undefined) {
      p[key] += offset;
    } else {
      for (let index = 0; index < keyframe.length; index++) {
        p[index] += offset;
      }
    }

    return p;
  });
}

function offset<T extends number>(): OperatorFunction<PointerEvent, T> {
  return pipe(
    map(({ offsetX }) => offsetX),
    pairwise(),
    map(([first, second]) => second - first as T),
    scan((accumulator, value) => (value + accumulator) as T, 0 as T),
  );
}

function offset2<T extends number>(): OperatorFunction<PointerEvent, T> {
  return pipe(
    map(({ offsetX }) => offsetX),
    pairwise(),
    map(([first, second]) => second - first as T),
  );
}


function toAbsolute<T extends number>(width$: Observable<number>): OperatorFunction<number, T> {
  return pipe(
    withLatestFrom(width$),
    map(([offset, width]) => offset / width as T),
  )
}