import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { BrushService } from '../utilities/brush.service';

@Component({
  selector: 'color-selector',
  template: `
  
  <input type="color"
       [ngModel]="brush.color$ | push"
       (ngModelChange)="brush.color$.next($event)">
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSelectorComponent {

  constructor(
    @Inject(BrushService) readonly brush: BrushService,
  ) {}
}
