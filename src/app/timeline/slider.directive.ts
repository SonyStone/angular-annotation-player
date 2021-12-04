import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, Injectable, InjectionToken, Input, Output } from "@angular/core";
import { BehaviorSubject, connectable, Observable } from "rxjs";
import { pointerdrag_2 } from "../events/pointer";
import { VideoTime } from "../interfaces/VideoTime";
import { TimelineService } from "./timeline.component";

@Injectable()
export class SliderService {
  rect = this.element.getBoundingClientRect();
  width = this.rect.width

  position$ = this.timeline.position(pointerdrag_2(this.element, this.dragZone))

  constructor(
    private element: Element,
    private dragZone: Element,
    private timeline: TimelineService,
  ) {}
}

const POSITION = new InjectionToken('position')

@Component({
  selector: 'slider',
  exportAs: 'slider',
  template: ``,
  styleUrls: ['./slider.component.scss'],
  providers: [
    { provide: POSITION, useValue: new BehaviorSubject(0) },
    {
      provide: SliderService,
      deps: [ElementRef, POSITION, DOCUMENT, TimelineService],
      useFactory: (
        elementRef: ElementRef<Element>,
        position$: Observable<VideoTime>,
        document: Document,
        timeline: TimelineService
      ) => new SliderService(
        elementRef.nativeElement,
        document.body,
        timeline,
        // position$, 
      )
    },
  ]
})
export class SliderComponent {

  @Input() set position(position: VideoTime | null) {
    if (position) {
      this.position$.next(position);
    }
  }

  @Output() positionChange = connectable(this.slider.position$);

  constructor(
    @Inject(SliderService) private slider: SliderService,
    @Inject(POSITION) private position$: BehaviorSubject<VideoTime>,
  ) {}
}