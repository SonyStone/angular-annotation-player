import { InjectionToken } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

export const VIDEO_ELEMENT = new InjectionToken<Observable<HTMLVideoElement>>('video element', {
  providedIn: 'root',
  factory: () => new ReplaySubject(),
})
