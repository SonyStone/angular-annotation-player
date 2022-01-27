import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppCommonModule } from '../../common/common.module';
import { ScrollModule } from '../video-scroll.directive';
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
      ScrollModule,
    ],
  ],
  declarations: [
    TimelineComponent,
  ],
  exports: [
    TimelineComponent,
  ],
})
export class TimelineModule { }
