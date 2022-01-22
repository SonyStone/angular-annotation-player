import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { BrushColor } from '../utilities/brush/brush-color';

@Component({
  selector: 'color-selector',
  template: `
  
  <input type="color"
       [ngModel]="color$ | push"
       (ngModelChange)="color$.next($event)">
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSelectorComponent {

  constructor(
    @Inject(BrushColor) readonly color$: BrushColor,
  ) {}
}
