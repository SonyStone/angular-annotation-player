import { Component, ElementRef, Inject, Injectable, InjectionToken, Input } from "@angular/core";
import { BehaviorSubject, combineLatest, distinctUntilChanged, map, Observable } from "rxjs";
import { TimelinePosition } from "../interfaces/TimelinePosition";
import { VideoTime } from "../interfaces/VideoTime";


@Injectable()
export class TimelineService {

  rect = this.element.getBoundingClientRect();
  width = this.rect.width

  constructor(
    private element: Element,
    private duration$: Observable<VideoTime>,
  ) {}

  position(drag$: Observable<PointerEvent | MouseEvent>): Observable<TimelinePosition> {
    return drag$.pipe(
      map((pointerEvent) => {
        const rect = this.rect;
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
  ): Observable<TimelinePosition> {
    return combineLatest([time$, this.duration$]).pipe(
      map(([time, duration]) => ((time / duration * this.width) || 0) as TimelinePosition),
    ); 
  }

  positionToVideoTime(
    position$: Observable<TimelinePosition>,
  ): Observable<VideoTime> {
    return  combineLatest([position$, this.duration$]).pipe(
      map(([x, duration]) => (x * duration  / this.width) as VideoTime),
    );
  }
}

const DURATION = new InjectionToken('duration')

@Component({
  selector: 'timeline',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./timeline.component.scss'],
  providers: [
    { provide: DURATION, useValue: new BehaviorSubject(0) },
    { 
      provide: TimelineService,
      deps: [ElementRef, DURATION],
      useFactory: (elementRef: ElementRef<Element>, duration: Observable<VideoTime>) => new TimelineService(elementRef.nativeElement, duration),
    },

  ]
})
export class TimelineComponent {
  @Input() set duration(duration: VideoTime | null) {
    if (duration) {
      this.duration$.next(duration);
    }
  }

  constructor(
    @Inject(DURATION) private duration$: BehaviorSubject<VideoTime>,
  ) {}
}