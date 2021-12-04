import { Brand } from "../interfaces/Brand.type";
import { VideoTime } from "../interfaces/VideoTime";

export type Timecode = Brand<string, 'Timecode'>;

export function secondsToTimecode(time: VideoTime, fps: number): Timecode {
	
	var hours = Math.floor(time / 3600) % 24;
	var minutes = Math.floor(time / 60) % 60;
	var seconds = Math.floor(time % 60);
	var frames = Math.floor(((time % 1) * fps));
	
	var result = (hours < 10 ? "0" + hours : hours) + ":"
	+ (minutes < 10 ? "0" + minutes : minutes) + ":"
	+ (seconds < 10 ? "0" + seconds : seconds) + ":"
	+ (frames < 10 ? "0" + frames : frames);

	return result as Timecode;

}