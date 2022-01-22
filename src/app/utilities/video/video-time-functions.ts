import {
  animationFrameScheduler,
  map,
  MonoTypeOperatorFunction,
  Observable,
  OperatorFunction,
  switchMapTo,
  takeUntil,
  tap,
  timer,
  withLatestFrom,
} from 'rxjs';

import { Frame } from '../../interfaces/Frame';
import { VideoTime } from '../../interfaces/VideoTime';
import { closestDownNumber, closestUpNumber } from '../closest';
import { frameToVideoTime, videoTimeToFrame } from '../videoTimeToFrame';


export function setCurrentTimeOperator(
  video: HTMLVideoElement,
): MonoTypeOperatorFunction<VideoTime> {
  return map((currentTime) => {
    if (currentTime !== Infinity) {
      video.currentTime = currentTime;
    }
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

