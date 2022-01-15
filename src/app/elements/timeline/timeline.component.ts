import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, DoCheck, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import {
  combineLatest,
  map,
  merge,
  Observable,
  of,
  ReplaySubject,
  shareReplay,
  startWith,
  Subscription,
  switchMap,
  withLatestFrom,
} from 'rxjs';

import { pointerdrag } from '../../events/pointer';
import { Frame } from '../../interfaces/Frame';
import { TimelinePosition } from '../../interfaces/TimelinePosition';
import { VideoTime } from '../../interfaces/VideoTime';
import { LayersStore } from '../../utilities/layers.store';
import { resize } from '../../utilities/resize';
import { TimelineCommentsService } from '../../utilities/timeline-comment-store';
import { VideoService } from '../../utilities/video.service';

const START_OFFEST = 8

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [
    TimelineCommentsService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent implements OnDestroy {

  trackByFn(_: number, item: KeyValue<Frame | string, ImageData>) {
    return item.value;
  }

  private timeline$: Observable<Element> = of(this.elementRef.nativeElement);
  readonly resize$ = resize(this.timeline$).pipe(
    shareReplay(),
  );

  readonly width$ = this.resize$.pipe(map(({ width }) => width - 16));

  readonly viewBox$ = this.resize$.pipe(
    map(({ height, width}) => `0 0 ${width} ${height}`),
  );

  readonly svgTimeline$ = svgTimeline(this.width$, this.video.duration$, this.video.fps$)
  readonly svgPath$ = this.svgTimeline$.pipe(map(({ svgPath }) => svgPath));
  readonly svgTexts$ = this.svgTimeline$.pipe(map(({ svgText }) => svgText));
  
  @ViewChild('sliderDragZone', { static: true })
  set sliderDragZone(element: ElementRef<SVGRectElement>) {
    this.sliderDragZone$.next(element.nativeElement);
  }
  private sliderDragZone$ = new ReplaySubject<SVGRectElement>();

  drag$ = this.sliderDragZone$.pipe(
    switchMap((element) => pointerdrag(element)),
    map(({ offsetX }) => offsetX - START_OFFEST),
    withLatestFrom(this.width$),
    map(([pointerX, width]) => {   
      const position = (pointerX <= 0)
        ? 0
        : (pointerX >= width)
          ? width
          : pointerX ;
    
      return position as TimelinePosition;
    }),
    shareReplay(),
  )

  time$ = this.drag$.pipe(
    withLatestFrom(this.video.duration$, this.width$),
    map(([position, duration, width]) => (position * duration  / width) as VideoTime),
    shareReplay(),
  )

  translate$ = combineLatest([
    merge(
      this.time$,
      this.video.currentTime$,
    ),
    this.video.duration$,
    this.width$,
  ]).pipe(
    map(([time, duration, width]) => ((time / duration * width) || 0) as TimelinePosition),
    startWith(0),
    map((translate) => `translate(${translate + START_OFFEST})`)
  );



  private subscription = new Subscription();

  constructor(
    @Inject(TimelineCommentsService) readonly timelineComments: TimelineCommentsService,
    @Inject(LayersStore) store: LayersStore,
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
    @Inject(VideoService) private readonly video: VideoService,
  ) {

    this.subscription.add(this.time$.subscribe((time) => store.setTime(time)));

    this.subscription.add(
      timelineComments.move$.pipe(
        withLatestFrom(store.currentLayer$),
        map(([_, data]) => data),
      ).subscribe((sequence) => {
        store.layer.set(sequence);
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}


const RULER_THICKNESS = 16;
const MAJOR_MARK_THICKNESS = 16;
const MEDIUM_MARK_THICKNESS = 6;
const MINOR_MARK_THICKNESS = 3;

function svgTimeline(
  width$: Observable<number>,
  duration$: Observable<VideoTime>,
  fps$: Observable<number>
): Observable<{
  svgPath: string,
  svgText: {
    transform: number;
    text: string;
  }[],
}> {
  return combineLatest([
    duration$,
    fps$,
    width$,
  ]).pipe(
    map(([duration, fps, width]) => {

      
      const seconds = Math.floor(duration);

      let dPathAttribute: string = '';

      const min_step_width = (width / seconds);

      const step_time = getStepTime(min_step_width, 50, 1.1);
      const step_frame = fps * step_time;
      const step_px = min_step_width * step_time;

      const svgTextCoordinates = [];

      const y = RULER_THICKNESS - MEDIUM_MARK_THICKNESS;

      const start = 8;
      const end = width + start;

      let frame = 0;
      let time = 0;
      let positionX = start
      while (positionX <= end) {

        let transform = positionX + 2;
        const text = `${Math.floor(frame)}`;

        svgTextCoordinates.push({ transform, text });
        dPathAttribute += `M${positionX},${y}V${RULER_THICKNESS}`;

        positionX += step_px;
        time += step_time;
        frame += step_frame;
      }

      dPathAttribute += `M${end},${y}V${RULER_THICKNESS}`;
      
      return { svgPath: dPathAttribute, svgText: svgTextCoordinates };
    }),
    shareReplay(),
  )
}

function getStepTime(stepWidth: number, minWidth: number, step = 2): number {

  const getStep = (stepTime: number): number => {
    if (stepWidth * stepTime < minWidth) {
      return getStep(stepTime * step);
    } else {
      return stepTime
    }
  }

  return getStep(1);
}
