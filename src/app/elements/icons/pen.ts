import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-pen',
  templateUrl: 'pen.svg',
  styleUrls: ['icon.scss'],
})
export class IconPenComponent {}

@NgModule({
  exports: [IconPenComponent],
  declarations: [IconPenComponent],
})
export class IconPenModule { }
