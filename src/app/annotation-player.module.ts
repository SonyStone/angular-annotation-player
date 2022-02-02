import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PushModule } from '@rx-angular/template/push';

import { AnnotationPlayerComponent } from './annotation-player.component';
import { AutosizeModule } from './common/autosize';
import { AppCommonModule } from './common/common.module';
import { RxIfModule } from './common/rx_if';
import { BrushSizeSelectComponent } from './elements/brush-size-selector.component';
import { ColorSelectorComponent } from './elements/color-selector.component';
import { FileDownloadDirective } from './elements/file-download.directive';
import { FileDropModule } from './elements/file-drop/file-drop.module';
import { FilesInputComponent } from './elements/files-input.component';
import { FrameRateSelectorComponent } from './elements/fps-selector.component';
import { HoldModule } from './elements/hold.directive';
import { IconAddModule } from './elements/icons/add';
import { IconEraserModule } from './elements/icons/eraser';
import { IconFastForwardModule } from './elements/icons/fast-forward';
import { IconFastRewindModule } from './elements/icons/fast-rewind';
import { IconPauseModule } from './elements/icons/pause';
import { IconPenModule } from './elements/icons/pen';
import { IconPlayModule } from './elements/icons/play';
import { IconRedoModule } from './elements/icons/redo';
import { IconSaveModule } from './elements/icons/save';
import { IconSkipNextModule } from './elements/icons/skip-next';
import { IconSkipPreviousModule } from './elements/icons/skip-previous';
import { IconUndoModule } from './elements/icons/undo';
import { PlayerModule } from './elements/player/player.module';
import { TimecodePipe } from './elements/timecode.pipe';
import { TimelineModule } from './elements/timeline/timeline.module';
import { ScrollModule } from './elements/video-scroll.directive';

@NgModule({
  imports: [
    [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
    ],
    [
      AutosizeModule,
      TextFieldModule,
    ],
    [
      TimelineModule,
      FileDropModule,
      AppCommonModule,
      PushModule,
      ScrollModule,
      PlayerModule,
      HoldModule,
      RxIfModule,
    ],
    [
      IconSkipPreviousModule,
      IconSkipNextModule,
      IconPlayModule,
      IconPauseModule,
      IconFastRewindModule,
      IconFastForwardModule,
      IconSaveModule,
      IconUndoModule,
      IconRedoModule,
      IconAddModule,
      IconPenModule,
      IconEraserModule,
    ],
  ],
  declarations: [
    AnnotationPlayerComponent,
    FileDownloadDirective,
    [
      TimecodePipe,
    ],
    [
      ColorSelectorComponent,
    ],
    [
      FilesInputComponent,
      BrushSizeSelectComponent,
      FrameRateSelectorComponent,
    ],
  ],
  exports: [
    AnnotationPlayerComponent,
  ],
})
export class AnnotationPlayerModule {}
