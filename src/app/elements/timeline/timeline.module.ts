import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PushModule } from '@rx-angular/template/push';
import { RxIfModule } from 'src/app/common/rx_if';

import { ScrollModule } from '../video-scroll.directive';
import { DragModule } from './drag.directive';
import { TimelineComponent } from './timeline.component';
import { WidthDirective } from './width.directive';

@NgModule({
  imports:      [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    [
      DragModule,
      ScrollModule,
      PushModule,
      RxIfModule,
    ],
  ],
  declarations: [
    TimelineComponent,
    [
      WidthDirective,
    ],
  ],
  exports: [
    TimelineComponent,
  ],
})
export class TimelineModule { }
