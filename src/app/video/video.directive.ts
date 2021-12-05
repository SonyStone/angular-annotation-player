import { Directive, ElementRef, Inject, Injectable, OnDestroy } from '@angular/core';
import {
  animationFrameScheduler,
  combineLatest,
  fromEvent,
  map,
  Observable,
  shareReplay,
  startWith,
  switchMapTo,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { VideoTime } from '../interfaces/VideoTime';
import { PlayerService } from '../player.service';
import { videoTimeToFrame } from './videoTimeToFrame';

const VIDEO_START_TIME: VideoTime = 0 as VideoTime;

/**
 * Слушатели на <video> элементе
 * 
 * [events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events)
 */
@Injectable()
export class VideoService implements OnDestroy {

  video = this.element.nativeElement;

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

  totalFrames$ = combineLatest([this.player.fps$, this.duration$]).pipe(
    map(([fps, duration]) => videoTimeToFrame(duration, fps))
  )

  currentFrame$ = combineLatest([
    this.currentTime$,
    this.player.fps$,
  ]).pipe(
    map(([time, fps]) => videoTimeToFrame(time, fps)),
    shareReplay(),
  );

  private subscription = this.player.currentTime_2$
    .subscribe((currentTime) => {
      this.video.currentTime = currentTime;
    })

  constructor(
    private readonly player: PlayerService,
    readonly element: ElementRef<HTMLVideoElement>,
  ) {
    this.player.duration.next(this.duration$);
    this.player.totalFrames.next(this.totalFrames$);
    this.player.currentTime.next(this.currentTime$);
    this.player.video.next(this);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

@Directive({
  selector: 'video',
  exportAs: 'video',
  providers: [
    VideoService,
  ],
})
export class VideoDirective {

  nativeElement = this.elementRef.nativeElement;

  duration$ = this.video.duration$;
  currentTime$ = this.video.currentTime$;

  constructor(
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

