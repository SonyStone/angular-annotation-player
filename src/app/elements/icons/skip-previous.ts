import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-skip-previous',
  templateUrl: 'skip-previous.svg',
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconSkipPreviousComponent {}

@NgModule({
  exports: [IconSkipPreviousComponent],
  declarations: [IconSkipPreviousComponent],
})
export class IconSkipPreviousModule { }
