import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export const DEFAULT_BRUSH_COLOR = '#ffffff';

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
export class BrushService {
  color$ = new BehaviorSubject(DEFAULT_BRUSH_COLOR);
  size$ = new BehaviorSubject(20);

  compositeOperations = COMPOSITE_OPERATIONS.map((value) => ({ name: value, value }))
  compositeOperation$ = new BehaviorSubject(COMPOSITE_OPERATIONS[0]);
}