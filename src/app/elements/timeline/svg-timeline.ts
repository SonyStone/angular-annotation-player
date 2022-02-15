import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { VideoTotalFrames } from 'src/app/utilities/video/video-total-frames';

import { TimelineWidth } from './timeline-width';

@Injectable()
export class SVGPath extends Observable<string> {
  constructor(
    @Inject(SVGTimeline) svgTimeline$: SVGTimeline,
  ) {
    const source = svgTimeline$.pipe(map((points) => {
      let dPathAttribute: string = '';
      const y = RULER_THICKNESS - MEDIUM_MARK_THICKNESS;

      for (const x of points) {
        dPathAttribute += `M${x},${y}V${RULER_THICKNESS}`;
      }
      
      return dPathAttribute;
    }));

    super((subscriber) => source.subscribe(subscriber));
  }
}

interface SVGTextsData {
  transform: number;
  text: string;
};

@Injectable()
export class SVGTexts extends Observable<SVGTextsData[]> {
  constructor(
    @Inject(SVGTimeline) svgTimeline$: SVGTimeline,
  ) {
    const source = svgTimeline$.pipe(map((points) => {
      const svgTextCoordinates = [];
      let frame = 0;
      for (const x of points) {
        const text = `${Math.floor(frame)}`;
        const transform = x + 2;

        svgTextCoordinates.push({ transform, text });

        frame += 1;
      }

      return svgTextCoordinates;
    }));

    super((subscriber) => source.subscribe(subscriber));
  }
}

const PADDING = 8;

@Injectable()
export class SVGTimeline extends Observable<number[]> {
  constructor(
    @Inject(TimelineWidth) width$: TimelineWidth,
    @Inject(VideoTotalFrames) totalFrames$: VideoTotalFrames,
  ) {
    const source = combineLatest([
      totalFrames$,
      width$,
    ]).pipe(
      map(([totalFrames, width]) => {
 
        const min_step_width = ((width - 16) / totalFrames);

        console.log(`min_step_width`, min_step_width);

        const step_frame = getStepTime(min_step_width, 50, 1.1);
        const step_px = min_step_width;

        const start = PADDING;
        const end = width - PADDING;
  
        const points = [];
        let x = start;
        while (x <= end) {
          points.push(x);
          x += step_px;
        }
        points.push(end);
        
        return points;
      }),
      shareReplay(),
    )

    super((subscriber) => source.subscribe(subscriber));
  }
}

const RULER_THICKNESS = 16;
const MAJOR_MARK_THICKNESS = 16;
const MEDIUM_MARK_THICKNESS = 6;
const MINOR_MARK_THICKNESS = 3;

function getStepTime(stepWidth: number, minWidth: number, step = 2): number {

  const getStep = (stepTime: number): number => {
    if (stepWidth * stepTime < minWidth) {
      return getStep(stepTime * step);
    } else {
      return stepTime
    }
  }

  return getStep(0.01);
}

