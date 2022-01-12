import { Inject, Injectable } from '@angular/core';
import {
  animationFrameScheduler,
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
  withLatestFrom,
} from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

import { Dimensions } from '../interfaces/Dimensions.interface';
import { Frame } from '../interfaces/Frame';
import { VideoTime } from '../interfaces/VideoTime';
import { ControlsService } from './controls.service';
import { FILES_CHANGE } from './files-change';
import { LayersStore } from './layers.store';
import { secondsToTimecode } from './secondsToTimecode';
import {
  frameByFrame,
  getCurrentTimeOperator,
  offsetByFrames,
  offsetToNextComment,
  offsetToPreviousComment,
  playPauseControls,
  setCurrentTimeOperator,
} from './video-time-functions';
import { videoTimeToFrame } from './videoTimeToFrame';

function createVideoSubject(src$: Observable<string>) {
  const destination = new ReplaySubject<HTMLVideoElement>()
  const source = combineLatest([destination, src$]).pipe(
    map(([video, src]) => {
      video.src = src;
      video.setAttribute('type', 'video/mp4');
      video.volume = 0;
      return video;
    }),
    shareReplay(),
  );

  return new AnonymousSubject(destination, source);
}


@Injectable()
export class VideoService {

  
  private readonly file$ = videoFileChange(this.files$);
  readonly src$ = videoSrc(this.file$);

  readonly video$ = createVideoSubject(this.src$);

  readonly fps$ = this.store.fps$;
  readonly frameSize$ = videoFrameSize(this.fps$);

  readonly duration$ = videoDuration(this.video$, this.frameSize$);

  /** Разрешение самого ролика внутри `video` */
  readonly dimensions$ = videoDimensions(this.video$);

  readonly totalFrames$ = videoTotalFrames(this.duration$, this.fps$);

  readonly currentTime$: Observable<VideoTime> = this.video$.pipe(
    switchMap((video) => merge(
      merge(
        this.store.currentTime$,
        offsetByFrames(video, this.controls.offsetByFrame$, this.frameSize$, this.duration$),
        frameByFrame(video, 1, this.controls.forward$, this.frameSize$, this.duration$),
        frameByFrame(video, -1, this.controls.rewind$, this.frameSize$, this.duration$),
        offsetToNextComment(video, this.controls.nextComment$, this.store.currentLayer$, this.fps$, this.totalFrames$),
        offsetToPreviousComment(video, this.controls.previousComment$, this.store.currentLayer$, this.fps$),
      ).pipe(
        setCurrentTimeOperator(video)
      ),
      videoPlaying(video).pipe(
        getCurrentTimeOperator(video),
      ),
    )),
    shareReplay(),
  );
  
  readonly isPlaying$ = this.video$.pipe(
    switchMap((video) => playPauseControls(this.controls.play$, this.controls.pause$).pipe(
      tap((isPlay) => {
        if (isPlay) {
          video.play();
        } else {
          video.pause();
        }
      })
    )),
    shareReplay(),
  )
  
  readonly currentFrame$ = videoCurrentFrame(this.currentTime$, this.fps$);

  constructor(
    @Inject(ControlsService) private readonly controls: ControlsService,
    @Inject(FILES_CHANGE) private readonly files$: Observable<FileList>,
    @Inject(LayersStore) private readonly store: LayersStore,
  ) {
    this.isPlaying$.subscribe();
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

function videoPlaying(video: HTMLVideoElement): Observable<number> {
  return fromEvent(video, 'play').pipe(
    switchMapTo(timer(0, 0, animationFrameScheduler).pipe(
      takeUntil(fromEvent(video, 'pause'))
    )
  ));
}


function videoDuration(
  video$: Observable<HTMLVideoElement>,
  frameSize$: Observable<VideoTime>,
): Observable<VideoTime> {
  return video$.pipe(
    switchMap((video) => fromEvent<Event>(video, 'durationchange').pipe(
      withLatestFrom(frameSize$),
      map(([_, frameSize]) => video.duration - (frameSize * 3) as VideoTime),
    )),
    shareReplay(),
  );
}


function videoDimensions(
  video$: Observable<HTMLVideoElement>
): Observable<Dimensions> {
  return video$.pipe(
    switchMap((video) => fromEvent<Event>(video, 'loadedmetadata').pipe(
      map(() => ({
        height: video.videoHeight,
        width: video.videoWidth,
      })),
    )),
    shareReplay(),
  );
}





function isVideoFile(file: File) {
  return file.type === 'video/mp4' || file.type === 'video/webm';
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
): Observable<string> {
  return file$.pipe(
    map((file) => URL.createObjectURL(file)),
    // map((src) => sanitizer.bypassSecurityTrustUrl(src) as string),
    // tap((v) => { console.log(`log-name`, `${v}`); }),
    startWith('https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.ogv'),
    // startWith('https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.mp4'),
    shareReplay(),
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