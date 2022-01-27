import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Frame } from 'src/app/interfaces/Frame';
import { VideoTime } from 'src/app/interfaces/VideoTime';
import { VideoFPS } from 'src/app/utilities/video/video-fps';
import { frameToVideoTime, videoTimeToFrame } from 'src/app/utilities/videoTimeToFrame';

class VideoTimeConvertor {

  static set(fps: number, convertor?: VideoTimeConvertor): VideoTimeConvertor {
    if (convertor) {
      convertor.fps = fps;
      return convertor;
    } else {
      return new VideoTimeConvertor(fps)
    }
  }

  constructor(
    private fps: number
  ) {}

  toFrame(time: VideoTime): Frame {
    return videoTimeToFrame(time, this.fps)
  }
  fromFrame(frame: Frame): VideoTime {
    return frameToVideoTime(frame, this.fps)
  }
}

@Injectable()
export class FrameConvertor extends Observable<VideoTimeConvertor> {
  constructor(
    @Inject(VideoFPS) fps$: VideoFPS,
  ) {
    let convertor: VideoTimeConvertor;

    const source = fps$.pipe(
      map((fps) => VideoTimeConvertor.set(fps, convertor))
    )

    super((subscriber) => source.subscribe(subscriber));
  }
}
