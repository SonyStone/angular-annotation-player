import { Pipe, PipeTransform } from "@angular/core";
import { VideoTime } from "./interfaces/VideoTime";
import { secondsToTimecode, Timecode } from "./utilities/secondsToTimecode";

const DEFAULT_FRAME_RATE = 29.97;
const DEFAULT_START_TIME = 0 as VideoTime;

/** Вывод TimeCode */
@Pipe({name: 'timecode'})
export class TimecodePipe implements PipeTransform {
  transform(
    currentTime: VideoTime | null = DEFAULT_START_TIME,
    fps: number | null = DEFAULT_FRAME_RATE
  ): Timecode {
    if (currentTime !== null && fps !== null) {
      return secondsToTimecode(currentTime, fps);
    }

    return '' as Timecode;
  }
}