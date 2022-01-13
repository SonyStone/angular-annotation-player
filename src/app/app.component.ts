import { ChangeDetectionStrategy, Component, ElementRef, Inject } from '@angular/core';
import { Subject } from 'rxjs';

import { AnnotationsService } from './utilities/annotations.service';
import { BrushService } from './utilities/brush.service';
import { CanvasService } from './utilities/canvas.service';
import { ControlsService } from './utilities/controls.service';
import { FILES_CHANGE } from './utilities/files-change';
import { KeyboardService } from './utilities/keyboard.service';
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
    KeyboardService,
    ControlsService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(
    @Inject(BrushService) readonly brush: BrushService,
    @Inject(AnnotationsService) readonly annotations: AnnotationsService,
    @Inject(VideoService) readonly video: VideoService,
    @Inject(FILES_CHANGE) readonly filesInput: Subject<FileList>,
    @Inject(LayersStore) readonly store: LayersStore,
    @Inject(ElementRef) readonly elementRef: ElementRef<Element>,
    @Inject(ControlsService) readonly controls: ControlsService,
  ) {}
}
