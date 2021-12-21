import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-save',
  templateUrl: 'save.svg'
})
export class IconSaveComponent {}

@NgModule({
  exports: [IconSaveComponent],
  declarations: [IconSaveComponent],
})
export class IconSaveModule { }