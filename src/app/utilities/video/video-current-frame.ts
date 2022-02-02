import { Inject, Injectable } from '@angular/core';
import {
  animationFrameScheduler,
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  fromEvent,
  map,
  merge,
  Observable,
  shareReplay,
  Subscriber,
  Subscription,
  switchMap,
  switchMapTo,
  takeUntil,
  tap,
  timer,
} from 'rxjs';
import { VIDEO_TIME_PRECISION, VideoTime } from 'src/app/interfaces/VideoTime';

import { Frame } from '../../interfaces/Frame';
import { VideoElement } from './video-element';
import { VideoFrameSize } from './video-frame-size';
import { VideoTotalFrames } from './video-total-frames';


@Injectable()
export class VideoCurrentFrame extends BehaviorSubject<Frame> {

  private video!: HTMLVideoElement;
  private frameSize!: VideoTime;
  private totalFrames!: Frame;

  private subscription!: Subscription;

  constructor(
    @Inject(VideoElement) video$: VideoElement,
    @Inject(VideoFrameSize) frameSize$: VideoFrameSize,
    @Inject(VideoTotalFrames) totalFrames$: VideoTotalFrames,
  ) {
    super(0 as Frame);
    
    this.subscription = totalFrames$.subscribe((totalFrames) => {
      this.totalFrames = totalFrames;
    }),

    this.source = combineLatest([video$, frameSize$]).pipe(
      switchMap(([video, frameSize]) => {
        this.video = video;
        this.frameSize = frameSize;

        return merge(
          videoPlaying(video),
          fromEvent(video, 'seeked'),
        ).pipe(
          map(() => Math.floor(Math.floor(video.currentTime * VIDEO_TIME_PRECISION) / frameSize)),
          distinctUntilChanged(),
          tap((v) => ((this as any)._value = v)),
        )
      }),
      shareReplay(),
    );
  }

  next(value: Frame) {
    const frame = clipFrame(value, this.totalFrames);
    super.next(frame);
    this.setCurrentTime(frame);
  }

  nextFrame(): void {
    const nextFrame = this.value + 1 as Frame;
    this.next(nextFrame);
  }

  previousFrame(): void {
    const nextFrame = this.value - 1 as Frame;
    this.next(nextFrame);
  }

  offsetFrame(offest: Frame): void {
    const nextFrame = this.value + offest as Frame;
    this.next(nextFrame);
  }

  lastFrame(): void {
    this.next(this.totalFrames);
  }

  firstFrame(): void {
    this.next(START_VIDEO_FRAME);
  }

  private setCurrentTime(frame: Frame): void {
    if (this.video && this.frameSize) {
      this.video.currentTime = (frame * this.frameSize) / VIDEO_TIME_PRECISION;
    }
  }

  /** @internal */
  protected _subscribe(subscriber: Subscriber<number>): Subscription {
    const subscription =
      this.source?.subscribe(subscriber) ?? Subscription.EMPTY;

    subscription.add(this.subscription);

    !subscription.closed && subscriber.next(this.value);

    return subscription;
  }
}


const START_VIDEO_FRAME = 0 as Frame;

function clipFrame(
  nextTime: Frame,
  totalFrames: Frame
): Frame {
  return (nextTime <= totalFrames)
    ? (nextTime > START_VIDEO_FRAME)
      ? nextTime
      : START_VIDEO_FRAME
    : totalFrames;
}

function videoPlaying(video: HTMLVideoElement): Observable<number> {
  return fromEvent(video, 'play').pipe(
    switchMapTo(timer(0, 0, animationFrameScheduler).pipe(
      takeUntil(fromEvent(video, 'pause'))
    )
    ));
}