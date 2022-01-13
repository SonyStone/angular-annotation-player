import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-redo',
  templateUrl: 'redo.svg',
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconRedoComponent {}

@NgModule({
  exports: [IconRedoComponent],
  declarations: [IconRedoComponent],
})
export class IconRedoModule { }
