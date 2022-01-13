import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-save',
  templateUrl: 'save.svg',
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSaveComponent {}

@NgModule({
  exports: [IconSaveComponent],
  declarations: [IconSaveComponent],
})
export class IconSaveModule { }
