import { Component, ElementRef, Inject, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { AnnotationsService } from './utilities/annotations.service';
import { BrushService } from './utilities/brush.service';
import { CanvasService } from './utilities/canvas.service';
import { FILES_CHANGE } from './utilities/files-change';
import { LayersStore } from './utilities/layers.store';
import { KeyboardService, ShortcutService } from './utilities/shortcut.service';
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
    ShortcutService,
  ]
})
export class AppComponent implements OnDestroy {

  private readonly subscription = new Subscription();

  constructor(
    @Inject(BrushService) readonly brush: BrushService,
    @Inject(AnnotationsService) readonly annotations: AnnotationsService,
    @Inject(VideoService) readonly video: VideoService,
    @Inject(FILES_CHANGE) readonly filesInput: Subject<FileList>,
    @Inject(LayersStore) readonly store: LayersStore,
    @Inject(ElementRef) readonly elementRef: ElementRef<Element>,
    @Inject(ShortcutService) readonly shortcut: ShortcutService,
  ) {
    this.subscription.add(shortcut.undo$.subscribe(() => {
      this.store.undo();
    }));

    this.subscription.add(shortcut.redo$.subscribe(() => {
      this.store.redo();
    }));

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
