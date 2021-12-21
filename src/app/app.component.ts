import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';

import { AnnotationsService } from './utilities/annotations.service';
import { BrushService } from './utilities/brush.service';
import { CanvasService } from './utilities/canvas.service';
import { FILES_CHANGE } from './utilities/files-change';
import { LayersStore } from './utilities/layers.store';
import { VideoService } from './utilities/video.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    VideoService,
    AnnotationsService,
    CanvasService,
    BrushService,
    LayersStore,
  ]
})
export class AppComponent {

  constructor(
    @Inject(BrushService) readonly brush: BrushService,
    @Inject(AnnotationsService) readonly annotations: AnnotationsService,
    @Inject(VideoService) readonly video: VideoService,
    @Inject(FILES_CHANGE) readonly filesInput: Subject<FileList>,
    @Inject(LayersStore) readonly store: LayersStore,
  ) {}
}

