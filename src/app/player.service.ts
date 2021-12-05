import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { combineLatest, distinctUntilChanged, EMPTY, merge, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, shareReplay, switchAll, switchMap, switchMapTo, tap, withLatestFrom } from 'rxjs/operators';

import { CanvasContext2dDirective } from './canvas-2d.directive';
import { Canvas } from './canvas/Canvas';
import { FileHandler } from './canvas/FileHandler';
import { paint } from './canvas/paint';
import { store } from './canvas/PaintData';
import { AnnotationStore } from './interfaces/AnnotationStore.interface';
import { Frame } from './interfaces/Frame';
import { VideoTime } from './interfaces/VideoTime';
import { scrollVideo } from './video/scrollVideo';
import { VideoService } from './video/video.directive';
import { frameToVideoTime, videoTimeToFrame } from './video/videoTimeToFrame';


@Injectable()
export class PlayerService {

  readonly duration = new ReplaySubject<Observable<VideoTime>>();
  readonly duration$ = this.duration.pipe(
    switchAll(),
    tap((e) => {
      console.log(`duration`, e);
    }),
    shareReplay(),
  );

  readonly totalFrames = new ReplaySubject<Observable<Frame>>();
  readonly totalFrames$ = this.totalFrames.pipe(
    switchAll(),
    tap((e) => {
      console.log(`totalFrames`, e);
    }),
    shareReplay(),
  );

  readonly fps = new ReplaySubject<Observable<number>>();
  readonly fps$: Observable<number> = this.fps.pipe(
    switchAll(),
    tap((e) => {
      console.log(`fps`, e);
    }),
    shareReplay(),
  );

  readonly color = new ReplaySubject<Observable<string>>();
  readonly color$: Observable<string> = this.color.pipe(
    switchAll(),
    tap((e) => {
      console.log(`color`, e);
    }),
    shareReplay(),
  );

  readonly currentTime = new ReplaySubject<Observable<VideoTime>>();
  readonly currentTime$: Observable<VideoTime> = this.currentTime.pipe(
    switchAll(),
    shareReplay(),
  );
  
  readonly sliderTime = new ReplaySubject<Observable<VideoTime>>();
  private readonly sliderTime$: Observable<VideoTime> = this.sliderTime.pipe(switchAll());

  readonly video = new ReplaySubject<VideoService>();
  readonly video$: Observable<VideoService> = this.video;

  save$ = new Subject<void>();
  restore$ = new Subject<File>();
  clear$ = new Subject<void>();
  remove$ = new Subject<Frame>();

  move = new Subject<Observable<Map<Frame, ImageData>>>();
  move$: Observable<Map<Frame, ImageData>> = this.move.pipe(
    switchAll(),
    shareReplay(),
  );

  canvas$ = new ReplaySubject<CanvasContext2dDirective>();

  constructor(
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  scroll$ = this.video$.pipe(
    switchMap((video) => scrollVideo(of(this.document.body), video, this.fps$)),
  );


  /** Текущее время в <video> */
  currentTime_1$: Observable<VideoTime> = merge(
    this.currentTime$,
    this.sliderTime$,
    this.scroll$,
  ).pipe(
    shareReplay(),
  );

  currentTime_2$: Observable<VideoTime> = merge(
    this.sliderTime$,
    this.scroll$,
  ).pipe(
    shareReplay(),
  );

  /** Вывод Frame */
  frame$: Observable<Frame> = combineLatest([this.currentTime_1$, this.fps$]).pipe(
    map(([currentTime, fps]) => videoTimeToFrame(currentTime, fps)),
    shareReplay(),
  );


  offscreenCanvas$ = this.canvas$.pipe(
    map(({ canvas }) => new Canvas(canvas.offsetWidth, canvas.offsetHeight))
  );

  canvasPaint$ = combineLatest([this.color$, this.canvas$]).pipe(
    switchMap(([color, { canvas, ctx }]) => paint(canvas, ctx, color).pipe(
      map(() => ctx.getImageData(0, 0, canvas.width, canvas.height)),
    )),
  );

  fileHandler$ = this.offscreenCanvas$.pipe(
    map((offscreenCanvas) => new FileHandler(offscreenCanvas))
  );

  store$: Observable<Map<Frame, ImageData>> = store(
    merge(
      merge(
        this.move$,
        // this.restore$.pipe(
        //   withLatestFrom(this.fileHandler$),
        //   switchMap(([file, fileHandler]) => fileHandler.restore(file)),
        // ),
      ).pipe(
        map((data) => () => data),
      ),
      this.canvas$.pipe(
        switchMap((canvas) => canvas.paintEnd$),
        withLatestFrom(this.frame$),
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
    switchMapTo(EMPTY),
    // withLatestFrom(this.store$, this.fileHandler$),
    // switchMap(([_, data, fileHandler]) => fileHandler.save(data)),
    // shareReplay(),
  );

}
