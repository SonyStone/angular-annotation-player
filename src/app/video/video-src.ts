import { inject, InjectionToken } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { map, Observable, startWith } from "rxjs";
import { VIDEO_FILE_CHANGE } from "./video-file-change";

export const VIDEO_SRC = new InjectionToken<Observable<string>>('scr', {
  providedIn: 'root',
  factory: () => {
    const in$ = inject(VIDEO_FILE_CHANGE);
    const sanitizer = inject(DomSanitizer);

    return in$.pipe(
      map((file) => URL.createObjectURL(file)),
      map((src) => sanitizer.bypassSecurityTrustUrl(src) as string),
      startWith('https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.ogv'),
      // startWith('https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.mp4')
    )
  },
})
