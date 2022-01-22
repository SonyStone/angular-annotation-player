import { Inject, Injectable } from '@angular/core';
import {
  animationFrameScheduler,
  filter,
  fromEvent,
  map,
  merge,
  Observable,
  shareReplay,
  switchMap,
  switchMapTo,
  takeUntil,
  timer,
  withLatestFrom,
} from 'rxjs';

import { Frame } from '../../interfaces/Frame';
import { VideoTime } from '../../interfaces/VideoTime';
import { Forward } from '../actions/forward';
import { OffsetByFrame } from '../actions/offset-by-frame';
import { Rewind } from '../actions/rewind';
import { Annotations } from '../layers.store';
import { VideoDuration } from './video-duration';
import { VideoElement } from './video-element';
import { VideoFrameSize } from './video-frame-size';
import { getCurrentTimeOperator, setCurrentTimeOperator } from './video-time-functions';

@Injectable()
export class VideoCurrentTime extends Observable<VideoTime> {
  constructor(
    @Inject(Annotations) store: Annotations,
    @Inject(VideoElement) video$: VideoElement,
    @Inject(VideoFrameSize) frameSize$: VideoFrameSize,
    @Inject(VideoDuration) duration$: VideoDuration,
    @Inject(Forward) forward$: Forward,
    @Inject(Rewind) rewind$: Rewind,
    @Inject(OffsetByFrame) offsetByFrame$: OffsetByFrame,
  ) {
    const source = video$.pipe(
      switchMap((video) => merge(
        merge(
          store.currentTime$,
          offsetByFrames(video, offsetByFrame$, frameSize$, duration$),
          frameByFrame(video, 1, forward$, frameSize$, duration$),
          frameByFrame(video, -1, rewind$, frameSize$, duration$),
          // offsetToNextComment(video, controls.nextComment$, store.currentLayer$, fps$, totalFrames$),
          // offsetToPreviousComment(video, controls.previousComment$, store.currentLayer$, fps$),
        ).pipe(
          setCurrentTimeOperator(video)
        ),
        videoPlaying(video).pipe(
          getCurrentTimeOperator(video),
        ),
      )),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}

function videoPlaying(video: HTMLVideoElement): Observable<number> {
  return fromEvent(video, 'play').pipe(
    switchMapTo(timer(0, 0, animationFrameScheduler).pipe(
      takeUntil(fromEvent(video, 'pause'))
    )
  ));
}

function frameByFrame(
  video: HTMLVideoElement,
  size: 1 | -1 | Frame,
  event$: Observable<PointerEvent>,
  frameSize$: Observable<VideoTime>,
  duration$: Observable<VideoTime>,
): Observable<VideoTime> {

  const start$ = event$.pipe(filter(({ type }) => type === 'pointerdown'));
  const end$ = event$.pipe(filter(({ type }) => type === 'pointerup' || type === 'pointerleave'));

  return start$.pipe(
    withLatestFrom(frameSize$, duration$),
    switchMap(([_, frame, duration]) => timer(500, frame * 1000, animationFrameScheduler).pipe(
      takeUntil(end$),
      map(() => offset(video.currentTime as VideoTime, size as Frame, frame, duration)),
    )),
  )
}

function offsetByFrames(
  video: HTMLVideoElement,
  offset$: Observable<Frame>,
  frameSize$: Observable<VideoTime>,
  duration$: Observable<VideoTime>,
): Observable<VideoTime> {
  return offset$.pipe(
    withLatestFrom(frameSize$, duration$),
    map(([move, frame, duration]) => offset(video.currentTime as VideoTime, move, frame, duration)),
  )
}

const START_VIDEO_TIME = 0 as VideoTime;
function offset(
  currentTime: VideoTime,
  offset: Frame,
  frameSize: VideoTime,
  duration: VideoTime,
): VideoTime {
  const nextTime = currentTime + (offset * frameSize) as VideoTime;

  return (nextTime <= duration)
    ? (nextTime > START_VIDEO_TIME)
      ? nextTime
      : START_VIDEO_TIME
    : duration;
}