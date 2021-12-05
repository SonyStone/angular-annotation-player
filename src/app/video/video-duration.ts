import { inject, InjectionToken } from '@angular/core';
import { fromEvent, map, Observable, shareReplay, switchMap, tap } from 'rxjs';

import { VideoTime } from '../interfaces/VideoTime';
import { VIDEO_ELEMENT } from './video-element';

export const VIDEO_DURATION = new InjectionToken<Observable<VideoTime>>('duration', {
  providedIn: 'root',
  factory: () => {
    
    const video$ = inject(VIDEO_ELEMENT);

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
})
