import { InjectionToken } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";

export const FILES_CHANGE = new InjectionToken<Observable<FileList>>('file change', {
  providedIn: 'root',
  factory: () => new ReplaySubject(),
})
