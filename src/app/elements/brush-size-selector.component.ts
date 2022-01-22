import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { BrushSize } from '../utilities/brush/brush-size';

@Component({
  selector: 'brush-size-selector',
  template: `
    <input type="range"
         min="0.1"
         max="50"
         [ngModel]="size$ | push"
         (ngModelChange)="size$.next($event)">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BrushSizeSelectComponent {
  constructor(
    @Inject(BrushSize) readonly size$: BrushSize,
  ) { }
}