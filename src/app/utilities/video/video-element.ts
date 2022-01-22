import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, ReplaySubject, shareReplay } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

import { VideoSrc } from './video-src';

@Injectable()
export class VideoElement extends AnonymousSubject<HTMLVideoElement> {
  constructor(
    @Inject(VideoSrc) src$: Observable<string>,
  ) {
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

    super(destination, source);
  }
}
