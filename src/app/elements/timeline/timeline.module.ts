import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppCommonModule } from '../../common/common.module';
import { CommentDirective } from './comment.directive';
import { DragModule } from './drag.directive';
import { TimelineComponent } from './timeline.component';

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    [
      AppCommonModule,
      DragModule,
    ],
  ],
  declarations: [
    TimelineComponent,
    [
      CommentDirective,
    ],
  ],
  exports: [
    TimelineComponent,
  ],
})
export class TimelineModule { }
