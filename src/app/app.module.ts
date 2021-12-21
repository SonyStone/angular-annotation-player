import { TextFieldModule } from '@angular/cdk/text-field';
import { Injector, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AutosizeModule } from './common/autosize';
import { AppCommonModule } from './common/common.module';
import { BrushSizeSelectComponent } from './elements/brush-size-selector.component';
import { CanvasPaintDirective } from './elements/canvas-paint.directive';
import { ColorSelectorComponent } from './elements/color-selector.component';
import { FileDownloadDirective } from './elements/file-download.directive';
import { FileDropDirective } from './elements/file-drop.directive';
import { FilesInputComponent } from './elements/files-input.component';
import { FrameRateSelectorComponent } from './elements/fps-selector.component';
import { FramePipe } from './elements/frame.pipe';
import { PlayerComponent } from './elements/player.component';
import { TimecodePipe } from './elements/timecode.pipe';
import { TimelineModule } from './elements/timeline/timeline.module';
import { ScrollDirective } from './elements/video-scroll.directive';
import { VideoDirective } from './elements/video.directive';

@NgModule({
  imports: [
    [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    [
      AutosizeModule,
      TextFieldModule,
    ],
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
