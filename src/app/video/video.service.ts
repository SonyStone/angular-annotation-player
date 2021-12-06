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
  switchMap,
  switchMapTo,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

import { FILES_CHANGE } from '../files-change';
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
  readonly totalFrames$ = videoTotalFrames(this.duration$, this.fps$);
  

  readonly currentTimeChange$ = new ReplaySubject<VideoTime>();
  readonly currentTime$ = videoCurrentTime(this.video$, this.currentTimeChange$);
  readonly currentFrame$ = videoCurrentFrame(this.currentTime$, this.fps$);

  private readonly file$ = videoFileChange(this.files$);
  readonly src$ = videoSrc(this.file$, this.sanitizer)

  constructor(
    @Inject(FILES_CHANGE) private readonly files$: Observable<FileList>,
    @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
  ) {}
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



const VIDEO_START_TIME = 0 as VideoTime;
function videoCurrentTime(
  video$: Observable<HTMLVideoElement>,
  currentTime$: Observable<VideoTime>,
): Observable<VideoTime> {
  const play$ = video$.pipe(
    switchMap((video) => {

      const play$ = fromEvent<Event>(video, 'play');
      const pause$ = fromEvent<Event>(video, 'pause');

      return play$.pipe(switchMapTo(timer(0, 0, animationFrameScheduler).pipe(
        map(() => video.currentTime as VideoTime),

        takeUntil(pause$)
      )));
      }
    ),

  );

  return merge(
    play$,
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
    tap((e) => {
      console.log(`duration`, e);
    }),
    shareReplay(),
  );
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