import { NgModule } from '@angular/core';
import { PushModule } from '@rx-angular/template';

import { FileValueAccessor } from './file_value_accessor';

@NgModule({
  imports: [
    PushModule,
  ],
  declarations: [
    // PushPipe,
    FileValueAccessor,
  ],
  exports: [
    PushModule,
    // PushPipe,
    FileValueAccessor,
  ]
})
export class AppCommonModule { }
