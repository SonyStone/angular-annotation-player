import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';

import { AnnotationsService } from './annotations/annotations.service';
import { BrushService } from './brush/brush.service';
import { CanvasService } from './canvas/canvas.service';
import { FILES_CHANGE } from './files-change';
import { VideoService } from './video/video.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    VideoService,
    AnnotationsService,
    CanvasService,
    BrushService,
  ]
})
export class AppComponent {

  constructor(
    @Inject(BrushService) readonly brush: BrushService,
    @Inject(AnnotationsService) readonly comments: AnnotationsService,
    @Inject(VideoService) readonly video: VideoService,
    @Inject(FILES_CHANGE) readonly filesInput: Subject<FileList>,
  ) {}
}

