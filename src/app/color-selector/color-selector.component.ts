import { Component, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BRUSH_COLOR } from '../brush/brush-color';

@Component({
  selector: 'color-selector',
  templateUrl: './color-selector.component.html',
})
export class ColorSelectorComponent {

  constructor(
    @Inject(BRUSH_COLOR) readonly color: BehaviorSubject<string>,
  ) {}
}
