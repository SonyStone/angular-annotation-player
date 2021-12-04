import { combineLatest, merge, Observable, startWith } from "rxjs";
import { distinctUntilChanged, map, shareReplay } from "rxjs/operators";
import { pointerdrag } from "../events/pointer";
import { Frame } from "../interfaces/Frame";
import { TimelinePosition } from "../interfaces/TimelinePosition";
import { VideoTime } from "../interfaces/VideoTime";
import { scrollVideo } from "./scrollVideo";
import { VideoDirective } from "./video.directive";
import { videoTimeToFrame } from "./videoTimeToFrame";

export class ElementDimensions {
  rect$ = this.element$.pipe(
    map((element) => element.getBoundingClientRect()),
    shareReplay(),
  );

  private width$ = this.rect$.pipe(map((rect) => rect.width));

  constructor(
    private readonly element$: Observable<Element>,
  ) {}

  position(drag$: Observable<PointerEvent | MouseEvent>): Observable<TimelinePosition> {
    return combineLatest([drag$, this.rect$]).pipe(
      map(([pointerEvent, rect]) => {
        const pointerX = (pointerEvent.x >=0) ? pointerEvent.x : 0;
    
        const start = rect.x;
        const width = rect.width;
    
        const position = (pointerX - start);
        const positionCorrection = (position <= 0)
          ? 0
          : (position >= width)
            ? width
            : position;
    
        return positionCorrection as TimelinePosition;
      }),
      distinctUntilChanged(),
    );
  }

  videoTimeToPosition(
    time$: Observable<VideoTime>,
    duration$: Observable<VideoTime>,
  ): Observable<TimelinePosition> {
    return combineLatest([time$, duration$, this.width$]).pipe(
      map(([time, duration, width]) => ((time / duration * width) || 0) as TimelinePosition),
    ); 
  }

  positionToVideoTime(
    position$: Observable<TimelinePosition>,
    duration$: Observable<VideoTime>,
  ): Observable<VideoTime> {
    return  combineLatest([position$, duration$, this.width$]).pipe(
      map(([x, duration, width]) => (x * duration  / width) as VideoTime),
    );
  }
}

export class Player {

  private scroll$ = scrollVideo(this.movezoneElement$, this.video, this.fps$);
  private timeline = new ElementDimensions(this.timelineElement$);
  private timeSliderPosition$ = this.timeline.position(pointerdrag(this.sliderElement$, this.movezoneElement$));
  private timeSliderTime$ = this.timeline.positionToVideoTime(
    this.timeSliderPosition$,
    this.video.duration$,
  );

  /** Сдвиг слайдера */
  translate$: Observable<TimelinePosition> = merge(
    this.timeSliderPosition$,
    this.timeline.videoTimeToPosition(merge(
      this.video.currentTime$,
      this.scroll$,
    ), this.video.duration$),
  ).pipe(
    startWith(0 as TimelinePosition),
    shareReplay(),
  );

  /** Текущее время в <video> */
  currentTime$: Observable<VideoTime> = merge(
    this.video.currentTime$,
    this.timeSliderTime$,
    this.scroll$,
  ).pipe(
    shareReplay(),
  );

  currentTime_2$: Observable<VideoTime> = merge(
    this.timeSliderTime$,
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
    private readonly sliderElement$: Observable<SVGGElement>,
    private readonly timelineElement$: Observable<SVGGraphicsElement>,
    private readonly video: VideoDirective,
    private readonly movezoneElement$: Observable<HTMLElement>,
    private readonly fps$: Observable<number>,
  ) {}
}