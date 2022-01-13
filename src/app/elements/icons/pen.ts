import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-pen',
  templateUrl: 'pen.svg',
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPenComponent {}

@NgModule({
  exports: [IconPenComponent],
  declarations: [IconPenComponent],
})
export class IconPenModule { }
