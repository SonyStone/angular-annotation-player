import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-skip-next',
  templateUrl: 'skip-next.svg',
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSkipNextComponent {}

@NgModule({
  exports: [IconSkipNextComponent],
  declarations: [IconSkipNextComponent],
})
export class IconSkipNextModule { }
