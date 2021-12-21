import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-undo',
  templateUrl: 'undo.svg'
})
export class IconUndoComponent {}

@NgModule({
  exports: [IconUndoComponent],
  declarations: [IconUndoComponent],
})
export class IconUndoModule { }
