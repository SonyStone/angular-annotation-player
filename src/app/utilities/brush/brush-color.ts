import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export const DEFAULT_BRUSH_COLOR = '#ffffff';

@Injectable()
export class BrushColor extends BehaviorSubject<string> {
  constructor() {
    super(DEFAULT_BRUSH_COLOR)
  }
}