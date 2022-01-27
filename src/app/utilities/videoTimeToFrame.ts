import { Frame } from "../interfaces/Frame";
import { VideoTime } from "../interfaces/VideoTime";

export const videoTimeToFrame = (
  time: VideoTime,
  fps: number
): Frame => Math.round(time * fps) as Frame;

export const frameToVideoTime = (
  frame: Frame,
  fps: number
): VideoTime => frame / fps as VideoTime;