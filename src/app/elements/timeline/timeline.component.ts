import { KeyValue } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy } from '@angular/core';
import { map, of, shareReplay, Subscription, tap, withLatestFrom } from 'rxjs';

import { Frame } from '../../interfaces/Frame';
import { LayersStore } from '../../utilities/layers.store';
import { resize } from '../../utilities/resize';
import { TimelineCommentsService } from '../../utilities/timeline-comment-store';

export enum RulerDirection {
	Horizontal = "H",
	Vertical = "V",
}

// Apparently the modulo operator in js does not work properly.
function mod(n: number, m: number) {
	const remain = n % m;
	return Math.floor(remain >= 0 ? remain : remain + m);
};

const RULER_THICKNESS = 16;
const MAJOR_MARK_THICKNESS = 16;
const MEDIUM_MARK_THICKNESS = 6;
const MINOR_MARK_THICKNESS = 3;

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [
    TimelineCommentsService,
  ],
})
export class TimelineComponent implements OnDestroy {

  trackByFn(_: number, item: KeyValue<Frame | string, ImageData>) {
    return item.value;
  }

  private timeline$ = of(this.elementRef.nativeElement)

  readonly resize$ = resize(this.timeline$).pipe(
    shareReplay(),
  );

  readonly viewBox$ = this.resize$.pipe(
    map(({ height, width}) => `0 0 ${width} ${height}`),
  );

  private subscription = new Subscription();


  constructor(
    @Inject(TimelineCommentsService) readonly timelineComments: TimelineCommentsService,
    @Inject(LayersStore) store: LayersStore,
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
  ) {
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

  direction = RulerDirection.Horizontal;
  origin: number = 0;
  numberInterval = 10;
  majorMarkSpacing = 100;
  mediumDivisions = 8;
  minorDivisions = 2;

  readonly svgPath$ = this.resize$.pipe(
    map(({ width }) => {
      const isVertical = this.direction === RulerDirection.Vertical;
      const lineDirection = RulerDirection.Vertical;
    
      const divisions = this.majorMarkSpacing / this.mediumDivisions / this.minorDivisions;
      const majorMarksFrequency = this.mediumDivisions * this.minorDivisions;
  
      let dPathAttribute = "";
      let i = 0;
      for (let location = 0; location <= width; location += divisions) {
        let length;

        if (i % majorMarksFrequency === 0) {
          length = MAJOR_MARK_THICKNESS;
        } else if (i % this.minorDivisions === 0) {
          length = MEDIUM_MARK_THICKNESS;
        } else {
          length = MINOR_MARK_THICKNESS;
        }

        i += 1;
  
        const destination = Math.round(location) + 0.5;

        const startPoint = isVertical
          ? `${RULER_THICKNESS - length},${destination}`
          : `${destination},${RULER_THICKNESS - length}`;

        dPathAttribute += `M${startPoint}${lineDirection}${RULER_THICKNESS} `;
      }
  
      return dPathAttribute;
    })
  )

  readonly svgTexts$ = this.resize$.pipe(
    map(({ width }) => {
      const isVertical = this.direction === RulerDirection.Vertical;

      const offsetStart = mod(this.origin, this.majorMarkSpacing);
      const shiftedOffsetStart = offsetStart - this.majorMarkSpacing;
  
      const svgTextCoordinates = [];
  
      let text = (Math.ceil(-this.origin / this.majorMarkSpacing) - 1) * this.numberInterval;
  
      for (let location = shiftedOffsetStart; location < width; location += this.majorMarkSpacing) {
        const destination = Math.round(location);
        const x = isVertical ? 9 : destination + 2;
        const y = isVertical ? destination + 1 : 9;
  
        let transform = `translate(${x} ${y})`;
        if (isVertical) {
          transform += " rotate(270)";
        }
  
        svgTextCoordinates.push({ transform, text });
  
        text += this.numberInterval;
      }
  
      return svgTextCoordinates;
    }),
  )
}