import { Inject, Injectable, InjectionToken } from '@angular/core';
import { filter, map, Observable, ReplaySubject, shareReplay } from 'rxjs';


@Injectable()
export class FileChange extends ReplaySubject<FileList> {}


@Injectable()
export class VideoFile extends Observable<File> {
  constructor(
    @Inject(FileChange) files$: Observable<FileList>,
  ) {
    const source = files$.pipe(
      map((files) => Array.from(files)),
      map((files) => files.find(isVideoFile)!),
      filter((v) => !!v),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}

function isVideoFile(file: File) {
  return file.type === 'video/mp4' || file.type === 'video/webm';
}

@Injectable()
export class CommentFile extends Observable<File> {
  constructor(
    @Inject(FileChange) files$: Observable<FileList>,
  ) {
    const source = files$.pipe(
      map((files) => Array.from(files)),
      map((files) => files.find(isJsonFile)!),
      filter((v) => !!v),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}

function isJsonFile(file: File) {
  return file.type === 'application/json';
}