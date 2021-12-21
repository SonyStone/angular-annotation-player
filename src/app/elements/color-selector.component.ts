import { Component, Inject } from '@angular/core';

import { BrushService } from '../utilities/brush.service';

@Component({
  selector: 'color-selector',
  template: `
  
  <input type="color"
       [ngModel]="brush.color$ | push"
       (ngModelChange)="brush.color$.next($event)">
  
  `,
})
export class ColorSelectorComponent {

  constructor(
    @Inject(BrushService) readonly brush: BrushService,
  ) {}
}
