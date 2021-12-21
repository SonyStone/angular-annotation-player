import { Component, NgModule } from '@angular/core';

@Component({
  selector: `icon-fast-forward`,
  templateUrl: `fast-forward.svg`,
  styleUrls: ['icon.scss'],
})
export class IconFastForwardComponent {}

@NgModule({
  declarations: [IconFastForwardComponent],
  exports: [IconFastForwardComponent],
})
export class IconFastForwardModule { }