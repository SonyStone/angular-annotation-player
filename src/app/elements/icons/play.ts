import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-play',
  templateUrl: 'play.svg'
})
export class IconPlayComponent {}

@NgModule({
  exports: [IconPlayComponent],
  declarations: [IconPlayComponent],
})
export class IconPlayModule { }
