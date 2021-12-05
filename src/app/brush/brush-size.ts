import { InjectionToken } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export const BRUSH_SIZE = new InjectionToken<Observable<number>>('brush size', {
  providedIn: 'root',
  factory: () => new ReplaySubject(),
})
