import { Brand } from "../interfaces/Brand.type";
import { VideoTime } from "../interfaces/VideoTime";

export type Timecode = Brand<string, 'Timecode'>;

export function secondsToTimecode(time: VideoTime, fps: number): Timecode {
	
	const hours = Math.floor(time / 3600) % 24;
	const minutes = Math.floor(time / 60) % 60;
	const seconds = Math.floor(time % 60);
	const frames = Math.floor(((time % 1) * fps));
	
	const result = (hours < 10 ? "0" + hours : hours) + ":"
	+ (minutes < 10 ? "0" + minutes : minutes) + ":"
	+ (seconds < 10 ? "0" + seconds : seconds) + ":"
	+ (frames < 10 ? "0" + frames : frames);

	return result as Timecode;

}