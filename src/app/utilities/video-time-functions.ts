import { animationFrameScheduler, defer, filter, groupBy, map, mapTo, merge, mergeMap, Observable, scan, share, shareReplay, switchMap, switchMapTo, takeUntil, tap, timer, withLatestFrom } from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { VideoTime } from '../interfaces/VideoTime';
import { closestDownNumber, closestUpNumber } from './closest';
import { frameToVideoTime, videoTimeToFrame } from './videoTimeToFrame';

export function setTime(
  video: HTMLVideoElement,
  currentTime$: Observable<VideoTime>,
): Observable<VideoTime> {
  return currentTime$.pipe(
    map((currentTime) => {
      video.currentTime = currentTime;
      return video.currentTime as VideoTime;
    }),
  );
}

export function playControls(
  video: HTMLVideoElement,
  play$: Observable<unknown>,
  pause$: Observable<unknown>,
): Observable<VideoTime> {
  return play$.pipe(
    tap(() => video.play()),
    switchMapTo(timer(0, 0, animationFrameScheduler).pipe(
      map(() => video.currentTime as VideoTime),
      takeUntil(pause$.pipe(
        tap(() => video.pause()),
      ))
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
  video: HTMLVideoElement,
  playPause$: Observable<void>,
  pause$: Observable<unknown>,
): Observable<VideoTime> {
  const toggle$ = toggle(merge(
    playPause$.pipe(mapTo(PlayControl.Toggle)),
    pause$.pipe(mapTo(PlayControl.Pause)),
  ));

  const play = toggle$.pipe(filter((v) => v));
  const pause = toggle$.pipe(filter((v) => !v));

  return playControls(video, play, pause);
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
    map(([_, layer, fps, totalFrames]) => {
      const currentTime = video.currentTime as VideoTime;
      const currentFrame = videoTimeToFrame(currentTime, fps);

      const nextCommentFrame = closestUpNumber(currentFrame + 1 as Frame, layer, totalFrames);

      video.currentTime = frameToVideoTime(nextCommentFrame, fps);

      return video.currentTime as VideoTime;
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
    map(([_, layer, fps, ]) => {
      const currentTime = video.currentTime as VideoTime;
      const currentFrame = videoTimeToFrame(currentTime, fps);

      const previousCommentFrame = closestDownNumber(currentFrame - 1 as Frame, layer);

      video.currentTime = frameToVideoTime(previousCommentFrame, fps);

      return video.currentTime as VideoTime;
    }),
  )
}

export function frameByFrame(
  video: HTMLVideoElement,
  size: 1 | -1 | Frame,
  start$: Observable<PointerEvent>,
  end$: Observable<PointerEvent>,
  frameSize$: Observable<VideoTime>,
  duration$: Observable<VideoTime>,
): Observable<VideoTime> {
  return start$.pipe(
    withLatestFrom(frameSize$, duration$),
    switchMap(([_, frame, duration]) => timer(500, frame * 1000, animationFrameScheduler).pipe(
      takeUntil(end$),
      map(() => {
        video.currentTime = offset(video, size as Frame, frame, duration);
        return video.currentTime as VideoTime;
      }),
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
    map(([move, frame, duration, ]) => {
      video.currentTime = offset(video, move, frame, duration)

      return video.currentTime as VideoTime;
    }),
  )
}

const START_VIDEO_TIME = 0 as VideoTime;
export function offset(
  video: HTMLVideoElement,
  offset: Frame,
  frameSize: VideoTime,
  duration: VideoTime,
): VideoTime {
  const currentTime = video.currentTime;
  const nextTime = currentTime + (offset * frameSize) as VideoTime;

  return (nextTime <= duration)
    ? (nextTime > START_VIDEO_TIME)
      ? nextTime
      : START_VIDEO_TIME
    : duration;
}