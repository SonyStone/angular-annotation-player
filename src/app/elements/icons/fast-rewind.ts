import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: `icon-fast-rewind`,
  templateUrl: `fast-rewind.svg`,
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconFastRewindComponent {}

@NgModule({
  declarations: [IconFastRewindComponent],
  exports: [IconFastRewindComponent],
})
export class IconFastRewindModule { }