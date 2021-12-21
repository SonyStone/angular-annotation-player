import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppCommonModule } from '../../common/common.module';
import { CommentDirective } from './comment.directive';
import { SliderDirective } from './slider.directive';
import { TimelineComponent } from './timeline.component';
import { TimelineDirective } from './timeline.directive';

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    [
      AppCommonModule,
    ],
  ],
  declarations: [
    TimelineComponent,
    SliderDirective,
    CommentDirective,
    TimelineDirective,
  ],
  exports: [
    TimelineComponent,
  ],
})
export class TimelineModule { }
