import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-play',
  templateUrl: 'play.svg',
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconPlayComponent {}

@NgModule({
  exports: [IconPlayComponent],
  declarations: [IconPlayComponent],
})
export class IconPlayModule { }
