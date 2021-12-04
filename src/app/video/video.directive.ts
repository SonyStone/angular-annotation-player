import { Directive, ElementRef, Inject, Injectable, InjectionToken, Input } from "@angular/core";
import { animationFrameScheduler, BehaviorSubject, combineLatest, distinctUntilChanged, EMPTY, fromEvent, map, Observable, shareReplay, startWith, Subject, switchMapTo, takeUntil, tap, timer } from "rxjs";
import { VideoTime } from "../interfaces/VideoTime";
import { videoTimeToFrame } from "./videoTimeToFrame";

const VIDEO_START_TIME: VideoTime = 0 as VideoTime;

/**
 * Слушатели на <video> элементе
 * 
 * [events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events)
 */
@Injectable()
export class VideoService {

  play$ = fromEvent<Event>(this.video, 'play');

  isPlayng = false;

  pause$ = fromEvent<Event>(this.video, 'pause');

  duration$ = fromEvent<Event>(this.video, 'durationchange').pipe(
    map(() => this.duration()),
  );

  loadeddata = fromEvent<Event>(this.video, 'loadeddata').pipe(
    tap((e) => {
      console.log(`loadeddata`, e);
    })
  )

  loadstart = fromEvent<Event>(this.video, 'loadstart').pipe(
    tap((e) => {
      console.log(`loadstart`, e);
    })
  );

  waitin = fromEvent<Event>(this.video, 'waitin').pipe(
    tap((play) => {
      console.log(`waitin`, play);
    })
  )

  currentTime$: Observable<VideoTime> = this.play$.pipe(

    switchMapTo(timer(0, 0, animationFrameScheduler).pipe(
      map(() => this.currentTime()),

      takeUntil(this.pause$)
    )),
    startWith(VIDEO_START_TIME),
    shareReplay(),
  )

  totalFrames$ = this.fps$.pipe(
    map((fps) => this.video.duration * fps)
  )

  currentFrame$ = combineLatest([
    this.currentTime$,
    this.fps$,
  ]).pipe(
    map(([time, fps]) => videoTimeToFrame(time, fps)),
    shareReplay(),
  );

  constructor(
    readonly video: HTMLVideoElement,
    private readonly fps$: Observable<number>,
  ) {}

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  duration() {
    return this.video.duration as VideoTime;
  }

  currentTime() {
    return this.video.currentTime as VideoTime
  }
}

const FPS = new InjectionToken<Observable<number>>('fps');

const DEFAULT_FRAME_RATE = 29.97;

@Directive({
  selector: 'video',
  exportAs: 'video',
  providers: [
    {
      provide: FPS, useValue: new BehaviorSubject(DEFAULT_FRAME_RATE),
    },
    { 
      provide: VideoService,
      deps: [ElementRef, FPS],
      useFactory: (elementRef: ElementRef<HTMLVideoElement>, fps: Observable<number>) => new VideoService(elementRef.nativeElement, fps),
    }
  ],
})
export class VideoDirective {

  @Input() set fps(fps: number | null) {
    if (fps) {
      this.fps$.next(fps);
    }
  }

  nativeElement = this.elementRef.nativeElement;

  duration$ = this.video.duration$;
  currentTime$ = this.video.currentTime$;

  constructor(
    @Inject(FPS) private readonly fps$: Subject<number>,
    @Inject(VideoService) private readonly video: VideoService,
    @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLVideoElement>
  ) {}

  play() {
    this.video.play();
  }

  pause() {
    this.video.pause();
  }

  duration() {
    return this.video.duration();
  }

  currentTime() {
    return this.video.currentTime();
  }
}

