import { Inject, Injectable, InjectionToken } from '@angular/core';
import { merge, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { store } from '../canvas/store';
import { AnnotationsService } from '../annotations/annotations.service';
import { Frame } from '../interfaces/Frame';

@Injectable()
export class TimelineCommentsService {
  move$ = new ReplaySubject<[Frame, Frame]>();
  store$ = timelineCommentStore(this.comments.store$, this.move$);

  constructor(
    @Inject(AnnotationsService) private readonly comments: AnnotationsService,
  ) {}
}

export const timelineCommentStore = (
  store$: Observable<Map<Frame, ImageData>>,
  lastMove: Observable<[Frame, Frame]>,
) => store<Map<Frame, ImageData>>(
  merge(
    store$.pipe(
      map((frames) => () => new Map(frames)),
    ),
    lastMove.pipe(
      map(([oldFrame, newFrame]) => (store: Map<Frame, ImageData>) => {
        const value = store.get(oldFrame)!;
        store.delete(oldFrame);

        store.set(newFrame, value);
  
        return store;
      }),
    )
  ),
  new Map(),
);
