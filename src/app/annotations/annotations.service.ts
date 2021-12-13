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
  tap,
  withLatestFrom,
} from 'rxjs';

import { CanvasService } from '../canvas/canvas.service';
import { CanvasOffscreen } from '../canvas/CanvasOffscreen';
import { FileHandler } from '../canvas/FileHandler';
import { store } from '../canvas/store';
import { FILES_CHANGE } from '../files-change';
import { Frame } from '../interfaces/Frame';
import { VideoService } from '../video/video.service';

@Injectable()
export class AnnotationsService {
  add$ = new ReplaySubject<[Frame, ImageData]>();

  fileHandler$ = fileHandler(this.canvas.ctx$);

  restore$ = commentRestore(commentFileChange(this.files$), this.fileHandler$);

  move$ = new ReplaySubject<Map<Frame, ImageData>>();
  remove$ = new Subject<Frame>();
  store$ = commentStore(this.move$, this.restore$, this.canvas.paint$, this.video.currentFrame$, this.remove$);
  
  currentImage$ = commentCurrentImage(this.video.currentFrame$, this.store$);

  save$ = new Subject<void>();
  file$ = commentSaveFile(this.save$, this.store$, this.fileHandler$);

  constructor(
    @Inject(FILES_CHANGE) private readonly files$: Observable<FileList>,
    @Inject(CanvasService) private readonly canvas: CanvasService,
    @Inject(VideoService) private readonly video: VideoService,
  ) {}
}






export function commentStore(
  move$: Observable<Map<Frame, ImageData>>,
  restore$: Observable<Map<Frame, ImageData>>,
  paint$: Observable<ImageData>,
  currentFrame$: Observable<Frame>,
  remove$: Observable<Frame>,
): Observable<Map<Frame, ImageData>> {
  return store(
    merge(
      merge(
        move$,
        restore$,
      ).pipe(
        map((data) => () => data),
      ),
      paint$.pipe(
        withLatestFrom(currentFrame$),
        map(([imageData, frame]) => (store: Map<Frame, ImageData>) => {
          store.set(frame, imageData);
    
          return store;
        }),
      ),
      remove$.pipe(
        map((frame: Frame) => (store: Map<Frame, ImageData>) => {
          store.delete(frame);
    
          return store;
        })
      ),
    ),
    new Map(),
  ).pipe(
    tap((e) => {
      console.log(`store`, e);
    }),
    shareReplay(),
  );
}

export function commentSaveFile(
  save$: Observable<void>,
  data$: Observable<Map<Frame, ImageData>>,
  fileHandler$: Observable<FileHandler>,
): Observable<File> {
  return save$.pipe(
    withLatestFrom(data$, fileHandler$),
    switchMap(([_, data, fileHandler]) => fileHandler.save(data)),
    shareReplay(),
  )
}

export function commentCurrentImage(
  currentFrame$: Observable<Frame>,
  store$: Observable<Map<Frame, ImageData>>,
): Observable<ImageData | undefined> {
  return combineLatest([
    store$,
    currentFrame$,
  ]).pipe(
    map(([data, frame])=> data.get(frame)),
    // map(([frame, data])=> closest(frame, data) ?? undefined),
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
): Observable<Map<Frame, ImageData>> {
  return file$.pipe(
    withLatestFrom(fileHandler$),
    switchMap(([file, fileHandler]) => fileHandler.restore(file)),
    shareReplay(),
  );
}

export function fileHandler(
  ctx$: Observable<CanvasRenderingContext2D>
) {
  const offscreenCanvas$ = ctx$.pipe(
    map(({ canvas }) => new CanvasOffscreen(canvas.offsetWidth, canvas.offsetHeight))
  );

  const fileHandler$ = offscreenCanvas$.pipe(
    map((offscreenCanvas) => new FileHandler(offscreenCanvas)),
    shareReplay(),
  );

  return fileHandler$;
}