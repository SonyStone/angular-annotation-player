import { Inject, Injectable } from '@angular/core';
import { merge, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Frame } from '../interfaces/Frame';
import { LayersStore } from './layers.store';
import { store } from './store';

@Injectable()
export class TimelineCommentsService {
  move$ = new ReplaySubject<[Frame, Frame]>();
  store$ = timelineCommentStore(this.store.currentLayer$, this.move$);

  constructor(
    @Inject(LayersStore) private readonly store: LayersStore,
  ) {}
}

export const timelineCommentStore = (
  store$: Observable<{ [key: Frame]: ImageData}>,
  lastMove: Observable<[Frame, Frame]>,
) => store<{ [key: Frame]: ImageData}>(
  merge(
    store$.pipe(
      map((frames) => () => ({ ...frames })),
    ),
    lastMove.pipe(
      map(([oldFrame, newFrame]) => (store: { [key: Frame]: ImageData}) => {

        const value = store[oldFrame]!;
        delete store[oldFrame];

        store[newFrame] = value;
  
        return store;
      }),
    )
  ),
  {},
);
