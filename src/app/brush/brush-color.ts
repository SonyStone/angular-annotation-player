import { InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const DEFAULT_BRUSH_COLOR = '#ffffff';
export const BRUSH_COLOR = new InjectionToken<Observable<string>>('brush color', {
  providedIn: 'root',
  factory: () => new BehaviorSubject(DEFAULT_BRUSH_COLOR),
})
