import { Pipe, PipeTransform } from '@angular/core';

import { Brand } from '../interfaces/Brand.type';
import { Frame } from '../interfaces/Frame';
import { VIDEO_TIME_PRECISION } from '../interfaces/VideoTime';

const DEFAULT_START_TIME = 0 as Frame;

export type Timecode = Brand<string, 'Timecode'>;

/** Вывод TimeCode */
@Pipe({name: 'timecode'})
export class TimecodePipe implements PipeTransform {
  transform(
    currentFrame: Frame | null = DEFAULT_START_TIME,
    frameSize: number | null
  ): Timecode {
    if (currentFrame !== null && frameSize !== null) {
      return framesToTimecode(currentFrame, frameSize);
    }

    return '' as Timecode;
  }
}

export function framesToTimecode(frame: Frame, frameSize: number): Timecode {	
  const time = frame * frameSize / VIDEO_TIME_PRECISION;

	const hours = Math.floor(time / 3600) % 24;
	const minutes = Math.floor(time / 60) % 60;
	const seconds = Math.floor(time % 60);
	const frames = Math.floor(frame % (VIDEO_TIME_PRECISION / frameSize));
	
	const result = formatTimeItem(hours) + ":"
		+ formatTimeItem(minutes) + ":"
		+ formatTimeItem(seconds) + ":"
		+ formatTimeItem(frames);

	return result as Timecode;
}

export function formatTimeItem(item: number): string {
	return (item < 10) ? `0${item}` : `${item}`;
}