import { inject, InjectionToken } from '@angular/core';
import {
  animationFrameScheduler,
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
  timer,
} from 'rxjs';

import { VideoTime } from '../interfaces/VideoTime';
import { VIDEO_ELEMENT } from './video-element';

export const VIDEO_CURRENT_TIME_CHANGE = new InjectionToken<Observable<VideoTime>>('current time change', {
  providedIn: 'root',
  factory: () => new ReplaySubject()
})

export const VIDEO_START_TIME = 0 as VideoTime;
export const VIDEO_CURRENT_TIME = new InjectionToken<Observable<VideoTime>>('current time', {
  providedIn: 'root',
  factory: () => {

    const video$ = inject(VIDEO_ELEMENT);

    const currentTime$ = inject(VIDEO_CURRENT_TIME_CHANGE);
    
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
})
