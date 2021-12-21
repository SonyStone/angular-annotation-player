import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-pause',
  templateUrl: 'pause.svg'
})
export class IconPauseComponent {}

@NgModule({
  exports: [IconPauseComponent],
  declarations: [IconPauseComponent],
})
export class IconPauseModule { }
