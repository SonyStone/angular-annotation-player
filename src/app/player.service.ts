import { Inject, Injectable, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, switchAll, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { CANVAS_CONTEXT } from './canvas/canvas-context';
import { CANVAS_PAINT } from './canvas/canvas-paint';
import { FileHandler } from './canvas/FileHandler';
import { store } from './canvas/store';
import { COMMENT_RESTORE } from './comments/comment-restore';
import { FILE_HANDLER } from './comments/file-handler';
import { Frame } from './interfaces/Frame';
import { VideoTime } from './interfaces/VideoTime';
import { VIDEO_CURRENT_FRAME } from './video/video-current-frame';
import { VIDEO_CURRENT_TIME } from './video/video-current-time';
import { VIDEO_FPS } from './video/video-fps';


@Injectable({
  providedIn: 'root',
})
export class FrameRateService implements OnDestroy {
  control = new FormControl(this.fps.value);
  private subscription = this.control.valueChanges.pipe(
    filter((fps) => fps > 0 && fps < 9000),
  ).subscribe((fps) => {
    this.fps.next(fps)
  })

  constructor(
    @Inject(VIDEO_FPS) private readonly fps: BehaviorSubject<number>,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


@Injectable({
  providedIn: 'root',
})
export class PlayerService {

  save$ = new Subject<void>();
  clear$ = new Subject<void>();
  remove$ = new Subject<Frame>();

  move = new Subject<Observable<Map<Frame, ImageData>>>();
  move$: Observable<Map<Frame, ImageData>> = this.move.pipe(
    switchAll(),
    shareReplay(),
  );

  constructor(
    @Inject(CANVAS_CONTEXT) readonly ctx$: Observable<CanvasRenderingContext2D>,
    @Inject(CANVAS_PAINT) readonly paint$: Observable<ImageData>,
    @Inject(VIDEO_FPS) readonly fps$: Observable<number>,
    @Inject(VIDEO_CURRENT_TIME) readonly currentTime$: Observable<VideoTime>,
    @Inject(VIDEO_CURRENT_FRAME) readonly currentFrame$: Observable<Frame>,
    @Inject(COMMENT_RESTORE) readonly restore$: Observable<Map<Frame, ImageData>>,
    @Inject(FILE_HANDLER) readonly fileHandler$: Observable<FileHandler>,
  ) {}

  store$: Observable<Map<Frame, ImageData>> = store(
    merge(
      merge(
        this.move$,
        this.restore$,
      ).pipe(
        map((data) => () => data),
      ),
      this.paint$.pipe(
        withLatestFrom(this.currentFrame$),
        map(([imageData, frame]) => (store: Map<Frame, ImageData>) => {
          store.set(frame, imageData);
    
          return store;
        }),
      ),
      this.remove$.pipe(
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

  file$ = this.save$.pipe(
    withLatestFrom(this.store$, this.fileHandler$),
    switchMap(([_, data, fileHandler]) => fileHandler.save(data)),
    shareReplay(),
  );

}
