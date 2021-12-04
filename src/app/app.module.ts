import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PushPipe } from './push.pipe';
import { FileDropDirective } from './file-drop.directive';
import { FileValueAccessor } from './file_value_accessor';
import { CanvasContext2dDirective } from './canvas-2d.directive';
import { FileDownloadDirective } from './file-download.directive';
import { TimelineComponent } from './timeline/timeline.component';
import { SliderComponent } from './timeline/slider.directive';
import { VideoDirective } from './video/video.directive';
import { TimecodePipe } from './timecode.pipe';
import { FramePipe } from './frame.pipe';

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
    CanvasContext2dDirective,
    FileDownloadDirective,
    TimelineComponent,
    SliderComponent,
    VideoDirective,
    TimecodePipe,
    FramePipe,
  ],
  bootstrap:    [
    AppComponent,
  ]
})
export class AppModule { }
