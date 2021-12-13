import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrushSizeSelectComponent } from './brush-size-selector.component';
import { CanvasPaintDirective } from './canvas/canvas-paint.directive';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { AppCommonModule } from './common/common.module';
import { FileDownloadDirective } from './file-download.directive';
import { FileDropDirective } from './file-drop.directive';
import { FilesInputComponent } from './files-input.component';
import { FrameRateSelectorComponent } from './fps-selector.component';
import { FramePipe } from './frame.pipe';
import { PlayerComponent } from './player.component';
import { TimecodePipe } from './timecode.pipe';
import { TimelineModule } from './timeline/timeline.module';
import { ScrollDirective } from './video/video-scroll.directive';
import { VideoDirective } from './video/video.directive';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    [
      TimelineModule,
      AppCommonModule,
    ],
  ],
  declarations: [
    FileDropDirective,
    AppComponent,
    CanvasPaintDirective,
    FileDownloadDirective,
    VideoDirective,
    [
      TimecodePipe,
      FramePipe,
    ],
    [
      ColorSelectorComponent,
      ScrollDirective,
    ],
    [
      PlayerComponent,
      FilesInputComponent,
      BrushSizeSelectComponent,
      FrameRateSelectorComponent,
    ],
  ],
  bootstrap:    [
    AppComponent,
  ]
})
export class AppModule {
  constructor(
    private injector: Injector,
  ) {} 

  // ngDoBootstrap() {
  //   const element = createCustomElement(AppComponent, { injector: this.injector })
  //   customElements.define("annotation-player", element);    
  // }
}
