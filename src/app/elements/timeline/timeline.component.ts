import { KeyValue } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { map, Subscription, withLatestFrom } from 'rxjs';

import { Frame } from '../../interfaces/Frame';
import { LayersStore } from '../../utilities/layers.store';
import { TimelineCommentsService } from '../../utilities/timeline-comment-store';

export enum RulerDirection {
	"Horizontal" = "Horizontal",
	"Vertical" = "Vertical",
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

  private subscription = new Subscription();

  constructor(
    @Inject(TimelineCommentsService) readonly timelineComments: TimelineCommentsService,
    @Inject(LayersStore) store: LayersStore,
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
  mediumDivisions = 5;
  minorDivisions = 2;
  rulerLength = 800;

  svgPath = this._svgPath()

  _svgPath(): string {
    const isVertical = this.direction === RulerDirection.Vertical;
    const lineDirection = isVertical ? "H" : "V";

    const offsetStart = mod(this.origin, this.majorMarkSpacing);
    const shiftedOffsetStart = offsetStart - this.majorMarkSpacing;

    const divisions = this.majorMarkSpacing / this.mediumDivisions / this.minorDivisions;
    const majorMarksFrequency = this.mediumDivisions * this.minorDivisions;

    let dPathAttribute = "";
    let i = 0;
    for (let location = shiftedOffsetStart; location <= this.rulerLength; location += divisions) {
      let length;
      if (i % majorMarksFrequency === 0) length = MAJOR_MARK_THICKNESS;
      else if (i % this.minorDivisions === 0) length = MEDIUM_MARK_THICKNESS;
      else length = MINOR_MARK_THICKNESS;
      i += 1;

      const destination = Math.round(location) + 0.5;
      const startPoint = isVertical ? `${RULER_THICKNESS - length},${destination}` : `${destination},${RULER_THICKNESS - length}`;
      dPathAttribute += `M${startPoint}${lineDirection}${RULER_THICKNESS} `;
    }

    return dPathAttribute;
  };

  svgTexts = this._svgTexts();

  _svgTexts(): { transform: string; text: number }[] {
    const isVertical = this.direction === RulerDirection.Vertical;

    const offsetStart = mod(this.origin, this.majorMarkSpacing);
    const shiftedOffsetStart = offsetStart - this.majorMarkSpacing;

    const svgTextCoordinates = [];

    let text = (Math.ceil(-this.origin / this.majorMarkSpacing) - 1) * this.numberInterval;

    for (let location = shiftedOffsetStart; location < this.rulerLength; location += this.majorMarkSpacing) {
      const destination = Math.round(location);
      const x = isVertical ? 9 : destination + 2;
      const y = isVertical ? destination + 1 : 9;

      let transform = `translate(${x} ${y})`;
      if (isVertical) transform += " rotate(270)";

      svgTextCoordinates.push({ transform, text });

      text += this.numberInterval;
    }

    return svgTextCoordinates;
  };
}