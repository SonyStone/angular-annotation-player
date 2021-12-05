import { InjectionToken } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { Frame } from '../interfaces/Frame';

export const COMMENT_ADD = new InjectionToken<Observable<[Frame, ImageData]>>('comment add', {
  providedIn: 'root',
  factory: () => new ReplaySubject(),
})
