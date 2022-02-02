import { Inject, Injectable } from '@angular/core';
import { shareReplay, Subject, switchMap, withLatestFrom } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

import { AppStore } from './app.store';
import { store } from '../store';
import { FileHandler } from './file-handler';



@Injectable()
export class SaveFile extends AnonymousSubject<File | void> {
  constructor(
    @Inject(AppStore) store: AppStore,
    @Inject(FileHandler) fileHandler$: FileHandler,
  ) {
    const destination = new Subject<File | void>();

    const source = destination.pipe(
      withLatestFrom(store, fileHandler$),
      switchMap(([_, data, fileHandler]) => fileHandler.save(data)),
      shareReplay(),
    );

    super(destination, source);
  }
}
