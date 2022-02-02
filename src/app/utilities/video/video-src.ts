import { Inject, Injectable } from '@angular/core';
import { select } from '@ngneat/elf';
import { map, Observable, shareReplay } from 'rxjs';

import { VideoFile } from '../files-change';
import { AppStore, write } from '../store/app.store';

@Injectable()
export class VideoSrc extends Observable<string> {
  constructor(
    @Inject(VideoFile) file$: Observable<File>,
    @Inject(AppStore) store: AppStore,
  ) {
    const src$ = file$.pipe(
      map((file) => URL.createObjectURL(file)),
      shareReplay(),
    );

    const source = store.pipe(
      select((state) => state.metadata.src),
      shareReplay(),
    );

    const subscription = src$.subscribe((src) => {
      store.update(write((state) => {
        state.metadata.src = src;
      }))
    });

    super((subscriber) => source.subscribe(subscriber).add(subscription));
  }
}
