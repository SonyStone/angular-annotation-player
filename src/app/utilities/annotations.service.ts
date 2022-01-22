import { Inject, Injectable } from '@angular/core';
import { combineLatest, EMPTY, filter, map, merge, Observable, shareReplay, Subject, switchMap, withLatestFrom } from 'rxjs';

import { Dimensions } from '../interfaces/Dimensions.interface';
import { Frame } from '../interfaces/Frame';
import { AppStore } from './app.store';
import { CanvasOffscreen } from './CanvasOffscreen';
import { Annotation, Entities } from './entity';
import { FileHandler } from '../common/FileHandler';
import { CommentFile } from './files-change';
import { Layer } from './layer';
import { store } from './store';
import { VideoDimensions } from './video/video-dimensions';

@Injectable()
export class FileHandler$ {}

@Injectable()
export class CommentRestore {}

@Injectable()
export class CommentRemove {}

@Injectable()
export class CurrentImage {}

@Injectable()
export class Save {}

@Injectable()
export class AnnotationsService {
  fileHandler$ = fileHandler(this.dimensions$);

  restore$ = commentRestore(this.commentFile$, this.fileHandler$);

  remove$ = new Subject<Frame>();
  
  // currentImage$ = currentImage(this.video.currentFrame$, this.store.entities$);
  currentImage$ = EMPTY;

  save$ = new Subject<void>();
  file$ = commentSaveFile(this.save$, this.store.store, this.fileHandler$);

  constructor(
    @Inject(AppStore) private readonly store: AppStore,
    @Inject(CommentFile) private readonly commentFile$: CommentFile,
    @Inject(VideoDimensions) private readonly dimensions$: VideoDimensions,
  ) {
    // this.canvas.paint$.pipe(
    //   withLatestFrom(this.video.currentFrame$),
    // ).subscribe(([imageData, frame]) => this.store.layer.add(frame, imageData));

    // this.restore$.subscribe((data) => {
    //   this.store.set(data);
    // });
  }
}

export function commentStore(
  set$: Observable<Layer>,
  paint$: Observable<ImageData>,
  currentFrame$: Observable<Frame>,
  remove$: Observable<Frame>,
): Observable<Layer> {
  return store<Layer>(
    merge(
      set$.pipe(
        map((data) => () => data.clone()),
      ),
      paint$.pipe(
        withLatestFrom(currentFrame$),
        map(([imageData, frame]) => (layer: Layer) => layer.add(frame, imageData)),
      ),
      remove$.pipe(
        map((frame: Frame) => (layer: Layer) => layer.remove(frame))
      ),
    ),
    new Layer(),
  ).pipe(
    shareReplay(),
  );
}

export function commentSaveFile(
  save$: Observable<void>,
  data$: Observable<any>,
  fileHandler$: Observable<FileHandler<any>>,
): Observable<File> {
  return save$.pipe(
    withLatestFrom(data$, fileHandler$),
    switchMap(([_, data, fileHandler]) => fileHandler.save(data)),
    shareReplay(),
  )
}

export function commentCurrentImage(
  currentFrame$: Observable<Frame>,
  store$: Observable<{ [key: Frame]: ImageData; }>,
): Observable<ImageData | undefined> {
  return combineLatest([
    store$,
    currentFrame$,
  ]).pipe(
    map(([data, frame])=> data[frame]),
    shareReplay(),
  )
}

export function currentImage(
  currentFrame$: Observable<Frame>,
  store$: Observable<Annotation[]>,
): Observable<ImageData | undefined> {
  return combineLatest([
    store$,
    currentFrame$,
  ]).pipe(
    map(([entities, frame]) => Entities.getImage(entities, frame)),
    shareReplay(),
  )
}

export function commentFileChange(
  files$: Observable<FileList>,
) {
  return files$.pipe(
    map((files) => Array.from(files)),
    map((files) => files.find(isJsonFile)!),
    filter((v) => !!v),
  );
}

function isJsonFile(file: File) {
  return file.type === 'application/json';
}

export function commentRestore(
  file$: Observable<File>,
  fileHandler$: Observable<FileHandler<any>>,
): Observable<any> {
  return file$.pipe(
    withLatestFrom(fileHandler$),
    switchMap(([file, fileHandler]) => fileHandler.restore(file)),
    shareReplay(),
  );
}

export function fileHandler(
  dimensions$: Observable<Dimensions>,
) {
  const offscreenCanvas$ = dimensions$.pipe(
    map((dimensions) => new CanvasOffscreen(dimensions.width, dimensions.height))
  );

  const fileHandler$ = offscreenCanvas$.pipe(
    map((offscreenCanvas) => new FileHandler(offscreenCanvas)),
    shareReplay(),
  );

  return fileHandler$;
}