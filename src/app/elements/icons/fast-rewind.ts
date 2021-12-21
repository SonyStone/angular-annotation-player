import { Component, NgModule } from '@angular/core';

@Component({
  selector: `icon-fast-rewind`,
  templateUrl: `fast-rewind.svg`,
})
export class IconFastRewindComponent {}

@NgModule({
  declarations: [IconFastRewindComponent],
  exports: [IconFastRewindComponent],
})
export class IconFastRewindModule { }