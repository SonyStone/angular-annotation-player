import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { BrushService } from '../utilities/brush.service';

@Component({
  selector: 'brush-size-selector',
  template: `
    <input type="range"
         min="0.1"
         max="50"
         [ngModel]="brush.size$ | push"
         (ngModelChange)="brush.size$.next($event)">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BrushSizeSelectComponent {
  constructor(
    @Inject(BrushService) readonly brush: BrushService,
  ) { }
}