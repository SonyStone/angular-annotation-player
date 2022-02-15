import { Inject, Injectable } from '@angular/core';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { Frame } from 'src/app/interfaces/Frame';
import { VideoTotalFrames } from 'src/app/utilities/video/video-total-frames';

import { TimelinePosition } from '../../interfaces/TimelinePosition';
import { TimelineWidth } from './timeline-width';


const PADDING = 8 as TimelinePosition;

export class TimelineConvertor {
  constructor(
    public frames = 0 as Frame,
    public ratio = 1,
  ) {}

  toFrame(position: TimelinePosition): Frame {
    const clipPosition = position - PADDING;
    const frame = Math.round(clipPosition * this.ratio) as Frame;
    // const clipFrame = clip<Frame>(frame, this.frames) 

    return frame;
  };

  toPosition(frame: Frame): TimelinePosition {
    const position = (frame / this.ratio) || 0;

    return position + PADDING as TimelinePosition
  };

  toPositions(frames: Frame[]): TimelinePosition[] {
    return frames.map((frame) => this.toPosition(frame));
  }
  
  toFrames(positions: TimelinePosition[]): Frame[] {
    return positions.map((position) => this.toFrame(position));
  }
}

@Injectable()
export class TimelineRatio extends Observable<TimelineConvertor> {

  convertor: TimelineConvertor;

  constructor(
    @Inject(TimelineWidth) width$: TimelineWidth,
    @Inject(VideoTotalFrames) totalFrames$: VideoTotalFrames,
  ) {
    const convertor = new TimelineConvertor();

    const source = combineLatest([width$, totalFrames$]).pipe(
      map(([width, totalFrames]) => {
        convertor.frames = totalFrames;
        convertor.ratio = totalFrames  / (width - PADDING * 2);
        return convertor;
      }),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));

    this.convertor = convertor;
  }
}

function clip<T extends number>(point: T, range: T): T {  
  return (point <= 0)
    ? 0 as T
    : (point >= range)
      ? range
      : point;
}