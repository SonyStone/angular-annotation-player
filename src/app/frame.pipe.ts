import { Pipe, PipeTransform } from "@angular/core";
import { Frame } from "./interfaces/Frame";
import { VideoTime } from "./interfaces/VideoTime";
import { videoTimeToFrame } from "./video/videoTimeToFrame";

const DEFAULT_FRAME_RATE = 29.97;
const DEFAULT_START_TIME = 0 as VideoTime;

/** Вывод Frame */
@Pipe({name: 'frame'})
export class FramePipe implements PipeTransform {
  transform(
    currentTime: VideoTime | null = DEFAULT_START_TIME,
    fps: number | null = DEFAULT_FRAME_RATE
  ): Frame {
    if (currentTime !== null && fps !== null) {
      return videoTimeToFrame(currentTime, fps);
    }

    return 0 as Frame;
  }
}