import { Brand } from "../interfaces/Brand.type";
import { VideoTime } from "../interfaces/VideoTime";

export type Timecode = Brand<string, 'Timecode'>;

export function secondsToTimecode(time: VideoTime, fps: number): Timecode {
	
	const hours = Math.floor(time / 3600) % 24;
	const minutes = Math.floor(time / 60) % 60;
	const seconds = Math.floor(time % 60);
	const frames = Math.floor(((time % 1) * fps));
	
	const result = formatTimeItem(hours) + ":"
		+ formatTimeItem(minutes) + ":"
		+ formatTimeItem(seconds) + ":"
		+ formatTimeItem(frames);

	return result as Timecode;
}

export function formatTimeItem(item: number): string {
	return (item < 10) ? `0${item}` : `${item}`;
}