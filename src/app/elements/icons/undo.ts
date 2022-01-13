import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-undo',
  templateUrl: 'undo.svg',
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconUndoComponent {}

@NgModule({
  exports: [IconUndoComponent],
  declarations: [IconUndoComponent],
})
export class IconUndoModule { }
