import { Inject, Injectable } from "@angular/core";
import { map, Observable, shareReplay, startWith } from "rxjs";
import { VideoFile } from "../files-change";

@Injectable()
export class VideoSrc extends Observable<string> {
  constructor(
    @Inject(VideoFile) file$: Observable<File>,
  ) {
    const source = file$.pipe(
      map((file) => URL.createObjectURL(file)),
      // map((src) => sanitizer.bypassSecurityTrustUrl(src) as string),
      // tap((v) => { console.log(`log-name`, `${v}`); }),
      
      startWith('https://i.imgur.com/VITzz3j.mp4'),
      // startWith('https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.ogv'),
      // startWith('https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.mp4'),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}
