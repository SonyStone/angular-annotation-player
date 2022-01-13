import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-add',
  templateUrl: 'add.svg',
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconAddComponent {}

@NgModule({
  exports: [IconAddComponent],
  declarations: [IconAddComponent],
})
export class IconAddModule { }
