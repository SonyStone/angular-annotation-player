import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-add',
  templateUrl: 'add.svg'
})
export class IconAddComponent {}

@NgModule({
  exports: [IconAddComponent],
  declarations: [IconAddComponent],
})
export class IconAddModule { }
