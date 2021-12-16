import { Inject, Injectable } from '@angular/core';
import {
  combineLatest,
  filter,
  map,
  merge,
  Observable,
  ReplaySubject,
  shareReplay,
  Subject,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { CanvasService } from './canvas.service';
import { CanvasOffscreen } from './CanvasOffscreen';
import { FileHandler } from './FileHandler';
import { FILES_CHANGE } from './files-change';
import { Layer } from './layer';
import { store } from './store';
import { Dimensions, VideoService } from './video.service';


@Injectable()
export class AnnotationsService {
  // add$ = new ReplaySubject<[Frame, ImageData]>();

  fileHandler$ = fileHandler(this.video.dimensions$);

  restore$ = commentRestore(commentFileChange(this.files$), this.fileHandler$);

  /** Новая позиция коментариев */
  move$ = new ReplaySubject<Layer>();

  remove$ = new Subject<Frame>();
  store$ = commentStore(
    merge(
      this.move$,
      this.restore$,
    ),
    this.canvas.paint$,
    this.video.currentFrame$,
    this.remove$
  );
  
  currentImage$ = commentCurrentImage(this.video.currentFrame$, this.store$);

  save$ = new Subject<void>();
  file$ = commentSaveFile(this.save$, this.store$, this.fileHandler$);

  constructor(
    @Inject(FILES_CHANGE) private readonly files$: Observable<FileList>,
    @Inject(CanvasService) private readonly canvas: CanvasService,
    @Inject(VideoService) private readonly video: VideoService,
  ) {}

  add(): void {}
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
  data$: Observable<Layer>,
  fileHandler$: Observable<FileHandler>,
): Observable<File> {
  return save$.pipe(
    withLatestFrom(data$, fileHandler$),
    switchMap(([_, data, fileHandler]) => fileHandler.save(data.getAll())),
    shareReplay(),
  )
}

export function commentCurrentImage(
  currentFrame$: Observable<Frame>,
  store$: Observable<Layer>,
): Observable<ImageData | undefined> {
  return combineLatest([
    store$,
    currentFrame$,
  ]).pipe(
    map(([data, frame])=> data.get(frame)),
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
  fileHandler$: Observable<FileHandler>,
): Observable<Layer> {
  return file$.pipe(
    withLatestFrom(fileHandler$),
    switchMap(([file, fileHandler]) => fileHandler.restore(file)),
    map((restore) => new Layer().set(restore)),
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