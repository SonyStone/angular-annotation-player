import { Inject, Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  animationFrameScheduler,
  BehaviorSubject,
  combineLatest,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  ReplaySubject,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  switchMapTo,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

import { FILES_CHANGE } from './files-change';
import { Frame } from '../interfaces/Frame';
import { VideoTime } from '../interfaces/VideoTime';
import { videoTimeToFrame } from './videoTimeToFrame';

export const DEFAULT_FRAME_RATE = 29.97;

@Injectable()
export class VideoService {

  readonly video$ = new ReplaySubject<HTMLVideoElement>();
  readonly fps$ = new BehaviorSubject(DEFAULT_FRAME_RATE);
  readonly frameSize$ = videoFrameSize(this.fps$);
  

  readonly duration$ = videoDuration(this.video$);

  /** Разрешение самого ролика внутри `video` */
  readonly dimensions$ = videoDimensions(this.video$);

  /** Размер элемента `video` */
  readonly resize$ = videoResize(this.video$);

  readonly totalFrames$ = videoTotalFrames(this.duration$, this.fps$);
  

  readonly currentTimeChange$ = new ReplaySubject<VideoTime>();
  readonly play$ = new Subject<void>();
  readonly pause$ = new Subject<void>();

  readonly videoState$ = videoState(
    this.video$,
    this.play$,
    this.pause$,
  );

  readonly currentTime$ = videoCurrentTime(
    this.videoState$,
    this.currentTimeChange$
  );
  readonly currentFrame$ = videoCurrentFrame(this.currentTime$, this.fps$);

  private readonly file$ = videoFileChange(this.files$);
  readonly src$ = videoSrc(this.file$, this.sanitizer)

  constructor(
    @Inject(FILES_CHANGE) private readonly files$: Observable<FileList>,
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
  ) {}

  video(element: HTMLVideoElement): void {
    this.video$.next(element);
  }

  play(): void {
    this.play$.next()
  }

  pause(): void {
    this.pause$.next();
  }
}



function videoCurrentFrame(
  currentTime$: Observable<VideoTime>,
  fps$: Observable<number>,
): Observable<Frame> {
  return combineLatest([
    currentTime$,
    fps$,
  ]).pipe(
    map(([time, fps]) => videoTimeToFrame(time, fps)),
    shareReplay(),
  )
}

function videoState(
  video$: Observable<HTMLVideoElement>,
  play$: Observable<void>,
  pause$: Observable<void>,
) {
  return video$.pipe(
    switchMap((video) => play$.pipe(
      tap(() => video.play()),
      switchMapTo(timer(0, 0, animationFrameScheduler).pipe(
        map(() => video.currentTime as VideoTime),
        takeUntil(pause$.pipe(
          tap(() => video.pause()),
        ))
      ))

    ))
  )
}

const VIDEO_START_TIME = 0 as VideoTime;
function videoCurrentTime(
  videoState$: Observable<VideoTime>,
  currentTime$: Observable<VideoTime>,
): Observable<VideoTime> {
  return merge(
    videoState$,
    currentTime$,
  ).pipe(
    startWith(VIDEO_START_TIME),
    shareReplay(),
  )
}

function videoDuration(
  video$: Observable<HTMLVideoElement>
): Observable<VideoTime> {
  return video$.pipe(
    switchMap((video) => fromEvent<Event>(video, 'durationchange').pipe(
      map(() => video.duration as VideoTime),
    )),
    shareReplay(),
  );
}

export interface Dimensions {
  width: number,
  height: number,
}

function videoDimensions(
  video$: Observable<HTMLVideoElement>
): Observable<Dimensions> {
  return video$.pipe(
    switchMap((video) => fromEvent<Event>(video, 'loadedmetadata').pipe(
      map(() => ({
        height: video.videoHeight,
        width: video.videoWidth,
        clientHeight: video.clientHeight,
        clientWidth: video.clientWidth,
      })),
    )),
    shareReplay(),
  );
}

function resizeObservable(elem: Element): Observable<ResizeObserverEntry[]> {
  return new Observable((subscriber) => {
      const resizeObserver = new ResizeObserver(entries => {
          subscriber.next(entries);
      });

      resizeObserver.observe(elem);
      return () => {
          resizeObserver.unobserve(elem);
      }
  });
}

function videoResize(
  video$: Observable<HTMLVideoElement>
): Observable<Dimensions> {

  return video$.pipe(
    switchMap((video) => resizeObservable(video)),
    map((entries) => ({
      height: entries[0].contentRect.height,
      width: entries[0].contentRect.width,
    }))
  )
}

function isVideoFile(file: File) {
  return file.type === 'video/mp4';
}

function videoFileChange(files$: Observable<FileList>): Observable<File> {
  return files$.pipe(
    map((files) => Array.from(files)),
    map((files) => files.find(isVideoFile)!),
    filter((v) => !!v),
  );
}



function videoSrc(
  file$: Observable<File>,
  sanitizer: DomSanitizer,
): Observable<string> {

  return file$.pipe(
    map((file) => URL.createObjectURL(file)),
    // startWith('https://r1---sn-aigzrn76.googlevideo.com/videoplayback?expire=1638843396&ei=pG-uYdK0OMKC1gahzoTYBg&ip=139.162.234.54&id=o-AE4Ptc9gCnO7dq5HE7x1ySvuWgvkVACD8sAdedyLcwpU&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&mh=J2&mm=31%2C29&mn=sn-aigzrn76%2Csn-aigl6ner&ms=au%2Crdu&mv=m&mvi=1&pl=23&initcwndbps=201250&vprv=1&mime=video%2Fmp4&ns=6Hn48hg8RhiuHDInOF_mJFMG&gir=yes&clen=63534190&dur=301.040&lmt=1608511030645810&mt=1638821347&fvip=1&keepalive=yes&fexp=24001373%2C24007246&beids=24138380&c=WEB&txp=5535432&n=am3UfJuQQUicZr1J&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgb3nJItLQA5t7nP3YlWnYC_AcGQYgZcqTdk2qdgo8NeYCIQD0SzGXD4A72nJokd5oNesCRRv8xvc-vWjksdAitIdtoA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgQu9rAqKtCxhpl5NVHZHfUiqT-9ToF3M7ZdOkhLuJPH8CIAq7DtD0l0LI7eb0_vi4FC_KXaVC45tDh5jhhp64HIU9&ratebypass=yes'),
    map((src) => sanitizer.bypassSecurityTrustUrl(src) as string),
    startWith('https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.ogv'),
    // startWith('https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.mp4')
  )
}

function videoTotalFrames(
  duration$: Observable<VideoTime>,
  fps$: Observable<number>
): Observable<Frame> {
  return combineLatest([
    duration$,
    fps$,
  ]).pipe(
    map(([time, fps]) => videoTimeToFrame(time, fps)),
    shareReplay(),
  )
}


function videoFrameSize(
  fps$: Observable<number>
): Observable<VideoTime> {
  return fps$.pipe(map((fps) => (1 / fps) as VideoTime));
}