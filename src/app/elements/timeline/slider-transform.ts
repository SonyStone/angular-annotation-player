import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, merge, Observable, shareReplay, startWith } from 'rxjs';
import { VideoCurrentTime } from 'src/app/utilities/video/video-current-time';
import { VideoDuration } from 'src/app/utilities/video/video-duration';

import { TimelinePosition } from '../../interfaces/TimelinePosition';
import { SliderTime } from './slider-time';
import { TimelineWidth } from './timeline-width';

const START_OFFEST = 8

@Injectable()
export class SliderTransform extends Observable<number> {
  constructor(
    @Inject(VideoCurrentTime) currentTime$: VideoCurrentTime,
    @Inject(VideoDuration) duration$: VideoDuration,
    @Inject(TimelineWidth) width$: TimelineWidth,
    @Inject(SliderTime) time$: SliderTime,
  ) {
    const source = combineLatest([
      merge(
        time$,
        currentTime$,
      ),
      duration$,
      width$,
    ]).pipe(
      map(([time, duration, width]) => ((time / duration * (width - 16)) || 0) as TimelinePosition),
      startWith(0),
      map((translate) => translate + START_OFFEST),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}