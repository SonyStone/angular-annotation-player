import { Frame } from "../interfaces/Frame";
import { VideoTime } from "../interfaces/VideoTime";

export const videoTimeToFrame = (
  time: VideoTime,
  fps: number
): Frame => Math.floor(time * fps) as Frame;

export const frameToVideoTime = (
  frame: Frame,
  fps: number
): VideoTime => (frame + 1) / fps as VideoTime;