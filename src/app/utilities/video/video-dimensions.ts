import { Inject, Injectable } from '@angular/core';
import { fromEvent, map, Observable, shareReplay, switchMap } from 'rxjs';

import { Dimensions } from '../../interfaces/Dimensions.interface';
import { VideoElement } from './video-element';

@Injectable()
export class VideoDimensions extends Observable<Dimensions> {
  constructor(
    @Inject(VideoElement) video$: VideoElement,
  ) {
    const source = video$.pipe(
      switchMap((video) => fromEvent<Event>(video, 'loadedmetadata').pipe(
        map(() => ({
          height: video.videoHeight,
          width: video.videoWidth,
        })),
      )),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}