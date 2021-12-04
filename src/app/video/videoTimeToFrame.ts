import { Frame } from "../interfaces/Frame";
import { VideoTime } from "../interfaces/VideoTime";

export const videoTimeToFrame = (
  time: VideoTime,
  fps: number
): Frame => Math.floor(time * fps) as Frame;