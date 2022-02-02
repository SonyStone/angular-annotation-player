import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay, Subject, switchMap, withLatestFrom } from 'rxjs';
import { Frame } from 'src/app/interfaces/Frame';

import { CommentFile } from '../files-change';
import { FileHandler } from './file-handler';


@Injectable()
export class CommentRestore extends Observable<any> {
  constructor(
    @Inject(CommentFile) commentFile$: CommentFile,
    @Inject(FileHandler) fileHandler$: FileHandler,
  ) {
    const source = commentFile$.pipe(
      withLatestFrom(fileHandler$),
      switchMap(([file, fileHandler]) => fileHandler.restore(file)),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}


@Injectable()
export class CommentRemove extends Subject<Frame> {
  constructor() {
    super();
  }
}