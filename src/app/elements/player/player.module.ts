import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template/push';
import { AppCommonModule } from 'src/app/common/common.module';
import { RxIfModule } from 'src/app/common/rx_if';

import { CanvasDimensionsDirective } from './canvas-dimensions.directive';
import { CanvasDirective } from './canvas-paint.directive';
import { PlayerComponent } from './player.component';
import { TransformDirective } from './transform.directive';
import { VideoDirective } from './video.directive';



@NgModule({
  imports: [
    [
      CommonModule,
      AppCommonModule,
    ],
    [
      PushModule,
      RxIfModule,
    ],
  ],
  declarations: [
    [
      PlayerComponent,
    ],
    [
      CanvasDirective,
      VideoDirective,
      TransformDirective,
      CanvasDimensionsDirective,
    ],
  ],
  exports: [
    PlayerComponent,
  ],
})
export class PlayerModule { }
