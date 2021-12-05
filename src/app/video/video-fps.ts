import { InjectionToken } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export const DEFAULT_FRAME_RATE = 29.97;
export const VIDEO_FPS = new InjectionToken<Observable<number>>('fps', {
  providedIn: 'root',
  factory: () => new BehaviorSubject(DEFAULT_FRAME_RATE),
})
