import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

const COMPOSITE_OPERATIONS = [
  'source-over',
  // // 'source-in',
  // // 'source-out',
  // 'source-atop',
  // 'destination-over',
  // // 'destination-in',
  'destination-out',
  // // 'destination-atop',
  // 'lighter',
  // // 'copy',
  // // 'xor',
  // 'multiply',
  // 'screen',
  // 'overlay',
  // 'darken',
  // 'lighten',
  // 'color-dodge',
  // 'color-burn',
  // 'hard-light',
  // 'soft-light',
  // // 'difference',
  // 'exclusion',
  // 'hue',
  // 'saturation',
  // 'color',
  // 'luminosity',
]

@Injectable()
export class CompositeOperation extends BehaviorSubject<string> {

  list = COMPOSITE_OPERATIONS.map((value) => ({ name: value, value }));

  isPen$ = this.pipe(map((v) => v === COMPOSITE_OPERATIONS[0]));
  isEraser$ = this.pipe(map((v) => v === COMPOSITE_OPERATIONS[1]))

  constructor() {
    super(COMPOSITE_OPERATIONS[0])
  }

  selectEraser() {
    this.next('destination-out');
  }

  selectPen() {
    this.next('source-over');
  }
}