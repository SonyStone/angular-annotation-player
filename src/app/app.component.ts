import { Component, Inject, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { CanvasPaintDirective } from './canvas/canvas-paint.directive';
import { FILES_CHANGE } from './files-change';
import { Frame } from './interfaces/Frame';
import { VideoTime } from './interfaces/VideoTime';
import { FrameRateService, PlayerService } from './player.service';
import { VIDEO_CURRENT_FRAME } from './video/video-current-frame';
import { VIDEO_CURRENT_TIME } from './video/video-current-time';
import { VIDEO_FILE_CHANGE } from './video/video-file-change';
import { VIDEO_FPS } from './video/video-fps';
import { VIDEO_SRC } from './video/video-src';
import { VIDEO_TOTAL_FRAMES } from './video/video-total-frames';
import { VideoDirective } from './video/video.directive';


const FRAME_RATES = [
  { name: 'film: 24', value: 24 },
  { name: 'NTSC: 29.97', value: 29.97 },
  { name: 'NTSC_Film: 23.976', value: 23.976 },
  { name: 'NTSC_HD: 59.94', value: 59.94 },
  { name: 'PAL: 25', value: 25 },
  { name: 'PAL_HD: 50', value: 50 },
  { name: 'web: 30', value: 30 },
  { name: 'high: 60', value: 60 },
];

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  frameRates = FRAME_RATES;

  @ViewChild(VideoDirective, { static: true }) video!: VideoDirective;
  @ViewChild(CanvasPaintDirective, { static: true }) canvas!: CanvasPaintDirective;


  constructor(
    readonly frameRate: FrameRateService,
    readonly player: PlayerService,
    @Inject(FILES_CHANGE) readonly filesInput: Subject<FileList>,
    @Inject(VIDEO_FILE_CHANGE) readonly videoInput$: Subject<File>,
    @Inject(VIDEO_SRC) readonly src$: Observable<string>,
    @Inject(VIDEO_FPS) readonly fps$: Observable<number>,
    @Inject(VIDEO_CURRENT_FRAME) readonly currentFrame$: Observable<Frame>,
    @Inject(VIDEO_CURRENT_TIME) readonly currentTime$: Observable<VideoTime>,
    @Inject(VIDEO_TOTAL_FRAMES) readonly totalFrames$: Observable<Frame>,
  ) {}
}
