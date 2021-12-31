import { Directive, ElementRef, Inject, OnDestroy } from '@angular/core';
import { fromEvent, map } from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { ControlsService } from '../utilities/controls.service';
import { VideoService } from '../utilities/video.service';


@Directive({
  selector: '[scroll]',
})
export class ScrollDirective implements OnDestroy {

  element = this.elementRef.nativeElement;

  scroll$ = fromEvent<WheelEvent>(this.element, 'wheel');

  private readonly subscription = this.scroll$.pipe(
    map((event) => ((event.deltaY > 0) ? 1 : -1) as Frame),
  ).subscribe((frame) => {
    this.actions.offsetByFrame(frame);
  })

  constructor(
    @Inject(ControlsService) private readonly actions: ControlsService,
    @Inject(VideoService) private readonly video: VideoService,
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
