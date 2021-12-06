import { Component, Inject, Injectable, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, Subject } from 'rxjs';

import { BrushService } from './brush/brush.service';
import { CanvasService } from './canvas/canvas.service';
import { CommentsService } from './comments/comments.service';
import { FILES_CHANGE } from './files-change';
import { VideoService } from './video/video.service';


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



@Injectable()
export class FrameRateService implements OnDestroy {
  control = new FormControl(this.video.fps$.value);
  private subscription = this.control.valueChanges.pipe(
    filter((fps) => fps > 0 && fps < 9000),
  ).subscribe((fps) => {
    this.video.fps$.next(fps)
  })

  constructor(
    @Inject(VideoService) private readonly video: VideoService,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}



@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    VideoService,
    CommentsService,
    CanvasService,
    BrushService,
    FrameRateService,
  ]
})
export class AppComponent {
  frameRates = FRAME_RATES;

  videoInput$ = this.video.video$;
  src$ = this.video.src$;
  fps$ = this.video.fps$;
  currentFrame$ = this.video.currentFrame$;
  currentTime$ = this.video.currentTime$;
  totalFrames$ = this.video.totalFrames$;

  constructor(
    readonly frameRate: FrameRateService,
    @Inject(BrushService) readonly brush: BrushService,
    @Inject(CommentsService) readonly comments: CommentsService,
    @Inject(VideoService) private readonly video: VideoService,
    @Inject(FILES_CHANGE) readonly filesInput: Subject<FileList>,
  ) {}
}

