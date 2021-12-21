import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-redo',
  templateUrl: 'redo.svg'
})
export class IconRedoComponent {}

@NgModule({
  exports: [IconRedoComponent],
  declarations: [IconRedoComponent],
})
export class IconRedoModule { }
