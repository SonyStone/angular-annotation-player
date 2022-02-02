import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { VideoTotalFrames } from 'src/app/utilities/video/video-total-frames';

import { TimelineWidth } from './timeline-width';

@Injectable()
export class SVGPath extends Observable<string> {
  constructor(
    @Inject(SVGTimeline) svgTimeline$: SVGTimeline,
  ) {
    const source = svgTimeline$.pipe(map(({ svgPath }) => svgPath));

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
    const source = svgTimeline$.pipe(map(({ svgText }) => svgText));

    super((subscriber) => source.subscribe(subscriber));
  }
}

@Injectable()
export class SVGTimeline extends Observable<{
  svgPath: string,
  svgText: SVGTextsData[]
}> {
  constructor(
    @Inject(TimelineWidth) width$: TimelineWidth,
    @Inject(VideoTotalFrames) totalFrames$: VideoTotalFrames,
  ) {
    const source = combineLatest([
      totalFrames$,
      width$,
    ]).pipe(
      map(([totalFrames, width]) => {
  
          
        let dPathAttribute: string = '';
  
        const min_step_width = ((width - 16) / totalFrames);

        // console.log(`min_step_width`, min_step_width);

        
        const step_frame = getStepTime(min_step_width, 50, 1.1);
        const step_px = min_step_width;
  
        const svgTextCoordinates = [];
  
        const y = RULER_THICKNESS - MEDIUM_MARK_THICKNESS;
  
        const start = 8;
        const end = width - 16 + start;
  
        let frame = 0;
        let positionX = start
        while (positionX <= end) {
  
          let transform = positionX + 2;
          const text = `${Math.floor(frame)}`;
  
          svgTextCoordinates.push({ transform, text });
          dPathAttribute += `M${positionX},${y}V${RULER_THICKNESS}`;
  
          positionX += step_px;
          frame += 1;
        }
  
        dPathAttribute += `M${end},${y}V${RULER_THICKNESS}`;
        
        return { svgPath: dPathAttribute, svgText: svgTextCoordinates };
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

