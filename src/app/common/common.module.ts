import { NgModule } from '@angular/core';

import { FileValueAccessor } from './file_value_accessor';
import { PushPipe } from './push.pipe';

@NgModule({
  declarations: [
    PushPipe,
    FileValueAccessor,
  ],
  exports: [
    PushPipe,
    FileValueAccessor,
  ]
})
export class AppCommonModule { }
