import { InjectionToken } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export const CANVAS_ELEMENT = new InjectionToken<Observable<HTMLCanvasElement>>('canvas element', {
  providedIn: 'root',
  factory: () => new ReplaySubject(),
})
