import { NgModule } from '@angular/core';

import { FileValueAccessor } from './file_value_accessor';

@NgModule({
  declarations: [
    FileValueAccessor,
  ],
  exports: [
    FileValueAccessor,
  ]
})
export class AppCommonModule { }
