import { Directive, ElementRef, Inject, NgModule, OnDestroy, Output } from '@angular/core';
import { connectable, distinctUntilChanged, map, OperatorFunction, withLatestFrom } from 'rxjs';
import { pointerdrag } from 'src/app/events/pointer';
import { TimelinePosition } from 'src/app/interfaces/TimelinePosition';
import { TimelineRatio } from './timeline-ratio';

@Directive({ selector: '[frameOffset]' })
export class OffsetDirective implements OnDestroy {

  @Output('frameOffset')
  drag = connectable(pointerdrag(this.elementRef.nativeElement).pipe(
    accumulateOffset(),
    withLatestFrom(this.ratio$),
    map(([positions, ratio]) => ratio.toFrame(positions[0] as TimelinePosition)),
    distinctUntilChanged(),
  ));

  private readonly subscription = this.drag.connect();

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
    @Inject(TimelineRatio) private readonly ratio$: TimelineRatio,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

function accumulateOffset(): OperatorFunction<PointerEvent, [number, number]> {
  const lastOffset = [0, 0];

  return map((event) => {
    if (event.type === 'pointerdown') {
      lastOffset[0] = event.offsetX;
      lastOffset[1] = event.offsetY;
    }

    return [
      event.offsetX - lastOffset[0],
      event.offsetY - lastOffset[1],
    ];
  });
}

import { Pipe, PipeTransform } from '@angular/core';
import { Frame } from 'src/app/interfaces/Frame';

@Pipe({
  name: 'position'
})

export class PositionPipe implements PipeTransform {

  constructor(
    @Inject(TimelineRatio) private readonly ratio$: TimelineRatio,
  ) {}

  transform(value: Frame): TimelinePosition {
    return this.ratio$.convertor.toPosition(value);
  }
}

@NgModule({
  declarations: [
    OffsetDirective,
    PositionPipe,
  ],
  exports: [
    OffsetDirective,
    PositionPipe,
  ],
})
export class OffsetModule { }
