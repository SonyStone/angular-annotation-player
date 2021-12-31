import {
  animationFrameScheduler,
  filter,
  map,
  mapTo,
  merge,
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction,
  pipe,
  scan,
  share,
  subscribeOn,
  Subscription,
  switchMap,
  switchMapTo,
  takeUntil,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { VideoTime } from '../interfaces/VideoTime';
import { closestDownNumber, closestUpNumber } from './closest';
import { frameToVideoTime, videoTimeToFrame } from './videoTimeToFrame';


export function setCurrentTimeOperator(
  video: HTMLVideoElement,
): MonoTypeOperatorFunction<VideoTime> {
  return map((currentTime) => {
    video.currentTime = currentTime;
    return getCurrentTime(video);
  });
}

export function getCurrentTimeOperator(
  video: HTMLVideoElement,
): OperatorFunction<any, VideoTime> {
  return map(() => getCurrentTime(video));
}

export function getCurrentTime(video: HTMLVideoElement): VideoTime {
  return video.currentTime as VideoTime;
}

export function getCurrentFrame(video: HTMLVideoElement, fps: number): Frame {
  return videoTimeToFrame(getCurrentTime(video), fps)
}


export function playControls(
  video: HTMLVideoElement,
  play$: Observable<unknown>,
  pause$: Observable<unknown>,
): Observable<number> {
  return play$.pipe(
    tap(() => video.play()),
    switchMapTo(timer(0, 0, animationFrameScheduler).pipe(
      takeUntil(pause$.pipe(
        tap(() => video.pause()),
      )),
    ))
  );
}

enum PlayControl {
  Toggle,
  Play,
  Pause,
}

export function toggle(
  toggle$: Observable<PlayControl>,
): Observable<boolean> {
  return toggle$.pipe(
    scan((accumulator: boolean, value: PlayControl) => {
      switch (value) {
        case PlayControl.Toggle:
          accumulator = !accumulator;
          return accumulator;
        case PlayControl.Play:
          return true;
        case PlayControl.Pause:
          return false;
        default:
          return accumulator;
      }
    }, false),
    share(),
  )
}

export function playPauseControls(
  playPause$: Observable<unknown>,
  pause$: Observable<unknown>,
): Observable<boolean> {
  return toggle(merge(
    playPause$.pipe(mapTo(PlayControl.Toggle)),
    pause$.pipe(mapTo(PlayControl.Pause)),
  ));
}

export function offsetToNextComment(
  video: HTMLVideoElement,
  offset$: Observable<void>,
  sequence$: Observable<{ [key: Frame]: ImageData; }>,
  fps$: Observable<number>,
  totalFrames$: Observable<Frame>,
): Observable<VideoTime> {
  return offset$.pipe(
    withLatestFrom(sequence$, fps$, totalFrames$),
    map(([_, sequence, fps, totalFrames]) => {
      const frame = getCurrentFrame(video, fps) + 1 as Frame;
      const frameWithComment = closestUpNumber(frame, sequence, totalFrames);

      return frameToVideoTime(frameWithComment, fps);
    }),
  )
}

export function offsetToPreviousComment(
  video: HTMLVideoElement,
  offset$: Observable<void>,
  sequence$: Observable<{ [key: Frame]: ImageData; }>,
  fps$: Observable<number>,
): Observable<VideoTime> {
  return offset$.pipe(
    withLatestFrom(sequence$, fps$),
    map(([_, sequence, fps, ]) => {
      const frame = getCurrentFrame(video, fps) - 1 as Frame;
      const frameWithComment = closestDownNumber(frame, sequence);

      return frameToVideoTime(frameWithComment, fps);
    }),
  )
}

export function frameByFrame(
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

export function offsetByFrames(
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
export function offset(
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