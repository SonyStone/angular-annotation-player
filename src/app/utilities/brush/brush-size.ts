import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BrushSize extends BehaviorSubject<number> {
  constructor() {
    super(20)
  }
}