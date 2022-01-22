import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';

import { Annotations } from '../layers.store';


@Injectable()
export class VideoFPS extends Observable<number> {
  constructor(
    @Inject(Annotations) store: Annotations,
  ) {
    const source = store.fps$.pipe(
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}