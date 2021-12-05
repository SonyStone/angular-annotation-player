import { combineLatest, merge, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Frame } from '../interfaces/Frame';
import { VideoTime } from '../interfaces/VideoTime';
import { scrollVideo } from './scrollVideo';
import { VideoDirective } from './video.directive';
import { frameToVideoTime, videoTimeToFrame } from './videoTimeToFrame';

export class Player {

  private scroll$ = scrollVideo(this.movezoneElement$, this.video, this.fps$);

  private sliderTime$ = combineLatest([this.timeSliderFrame$, this.fps$]).pipe(
    map(([frame, fps]) => frameToVideoTime(frame, fps)),
    shareReplay(),
  );

  /** Текущее время в <video> */
  currentTime$: Observable<VideoTime> = merge(
    this.video.currentTime$,
    this.sliderTime$,
    this.scroll$,
  ).pipe(
    shareReplay(),
  );

  currentTime_2$: Observable<VideoTime> = merge(
    this.sliderTime$,
    this.scroll$,
  ).pipe(
    shareReplay(),
  );

  /** Вывод Frame */
  frame$: Observable<Frame> = combineLatest([this.currentTime$, this.fps$]).pipe(
    map(([currentTime, fps]) => videoTimeToFrame(currentTime, fps)),
    shareReplay(),
  );

  constructor(
    private readonly timeSliderFrame$: Observable<Frame>,
    private readonly video: VideoDirective,
    private readonly movezoneElement$: Observable<HTMLElement>,
    private readonly fps$: Observable<number>,
  ) {}
}