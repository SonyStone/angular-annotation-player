import { Inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  merge,
  Observable,
  of,
  pairwise,
  ReplaySubject,
  scan,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { windowBy } from 'src/app/common/window-by';

import { ThumbTranslate } from './thumb';

@Injectable()
export class Keyframes extends AnonymousSubject<Keyframe[]> {

  constructor(
    @Inject(ThumbTranslate) thumb$: ThumbTranslate,
  ) {
    const destination = new ReplaySubject<Keyframe[]>()
    const source = of([
      new Keyframe(thumb$, 40, 90),
      new Keyframe(thumb$, 120, 200),
    ]).pipe(
      shareReplay(),
    ) as Observable<Keyframe[]>;

    super(destination, source);
  }

  line(drag: PointerEvent, index: number): void {
    console.log(`lineDrag`, index)
  }
  start(drag: PointerEvent, index: number): void {
    console.log(`keyframe 1 Drag`, index)
  }
  end(drag: PointerEvent, index: number): void {
    console.log(`keyframe 2 Drag`, index)
  }
}

class Keyframe {
  line = new Subject<PointerEvent>();
  key = [
    new Subject<PointerEvent>(),
    new Subject<PointerEvent>(),
  ];

  frame = [
    new BehaviorSubject(this.start),
    new BehaviorSubject(this.end),
  ];
  
  constructor(
    thumb$: ThumbTranslate,
    private start: number,
    private end: number,
  ) {
    offsetDrag(merge(this.line, this.key[1]), this.frame[1]).subscribe((v) => {
      this.frame[1].next(v);
      thumb$.next(v);
    });
    offsetDrag(merge(this.line, this.key[0]), this.frame[0]).subscribe((v) => {
      this.frame[0].next(v);
      thumb$.next(v);
    });

  }
}



function offsetDrag(
  pointer: Observable<PointerEvent>,
  offset: Observable<number>,
) {
  return pointer.pipe(
    windowBy((event) => event.type === 'pointerdown'),
    withLatestFrom(offset),
    switchMap(([event, offset]) => event.pipe(
      map(({ offsetX }) => offsetX),
      pairwise(),
      map(([first, second]) => second - first),
      scan((accumulator, value) => accumulator += value, 0),
      map((value) => value + offset),
    )),
  );
}


