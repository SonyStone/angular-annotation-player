import { Inject, Injectable, InjectionToken } from '@angular/core';
import { merge, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { store } from './store';
import { AnnotationsService } from './annotations.service';
import { Frame } from '../interfaces/Frame';
import { Layer } from './layer';

@Injectable()
export class TimelineCommentsService {
  move$ = new ReplaySubject<[Frame, Frame]>();
  store$ = timelineCommentStore(this.comments.store$, this.move$);

  constructor(
    @Inject(AnnotationsService) private readonly comments: AnnotationsService,
  ) {}
}

export const timelineCommentStore = (
  store$: Observable<Layer>,
  lastMove: Observable<[Frame, Frame]>,
) => store<Layer>(
  merge(
    store$.pipe(
      map((frames) => () => frames.clone()),
    ),
    lastMove.pipe(
      map(([from, to]) => (layer: Layer) => layer.move(from, to)),
    )
  ),
  new Layer(),
);
