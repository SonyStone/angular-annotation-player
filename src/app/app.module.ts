import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasPaintDirective } from './canvas/canvas-paint.directive';
import { ColorSelectorComponent } from './color-selector/color-selector.component';
import { FileDownloadDirective } from './file-download.directive';
import { FileDropDirective } from './file-drop.directive';
import { FileValueAccessor } from './file_value_accessor';
import { FramePipe } from './frame.pipe';
import { PushPipe } from './push.pipe';
import { TimecodePipe } from './timecode.pipe';
import { CommentDirective } from './timeline/comment.directive';
import { SliderDirective } from './timeline/slider.directive';
import { TimelineComponent } from './timeline/timeline.component';
import { TimelineDirective } from './timeline/timeline.directive';
import { ScrollDirective } from './video/video-scroll.directive';
import { VideoDirective } from './video/video.directive';

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    PushPipe,
    FileValueAccessor,
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
      TimelineComponent,
      SliderDirective,
      CommentDirective,
      TimelineDirective,
    ],
    [
      ColorSelectorComponent,
      ScrollDirective,
    ],
  ],
  bootstrap:    [
    AppComponent,
  ]
})
export class AppModule { }
