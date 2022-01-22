import { Inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay, withLatestFrom } from 'rxjs';
import { VideoTime } from 'src/app/interfaces/VideoTime';
import { VideoDuration } from 'src/app/utilities/video/video-duration';

import { SliderDrag } from './slider-drag';
import { TimelineWidth } from './timeline-width';

@Injectable()
export class SliderTime extends Observable<VideoTime> {
  constructor(
    @Inject(SliderDrag) drag$: SliderDrag,
    @Inject(VideoDuration) duration$: VideoDuration,
    @Inject(TimelineWidth) width$: TimelineWidth,
  ) {
    const source = drag$.pipe(
      withLatestFrom(duration$, width$),
      map(([position, duration, width]) => (position * duration  / (width - 16)) as VideoTime),
      shareReplay(),
    )

    super((subscriber) => source.subscribe(subscriber));
  }
}