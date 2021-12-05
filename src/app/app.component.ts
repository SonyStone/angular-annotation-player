import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';

import { CanvasContext2dDirective } from './canvas-2d.directive';
import { PlayerService } from './player.service';
import { VideoDirective } from './video/video.directive';


const FRAME_RATES = [
  { name: 'film: 24', value: 24 },
  { name: 'NTSC: 29.97', value: 29.97 },
  { name: 'NTSC_Film: 23.976', value: 23.976 },
  { name: 'NTSC_HD: 59.94', value: 59.94 },
  { name: 'PAL: 25', value: 25 },
  { name: 'PAL_HD: 50', value: 50 },
  { name: 'web: 30', value: 30 },
  { name: 'high: 60', value: 60 },
];

const DEFAULT_COLOR = '#ffffff';
const DEFAULT_FRAME_RATE = 29.97;


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    PlayerService,
  ],
})
export class AppComponent {
  frameRates = FRAME_RATES;

  @ViewChild(VideoDirective, { static: true }) video!: VideoDirective;
  @ViewChild(CanvasContext2dDirective, { static: true }) canvas!: CanvasContext2dDirective;


  color = new FormControl(DEFAULT_COLOR);
  color$: Observable<string> = this.color.valueChanges.pipe(
    startWith(this.color.value),
    shareReplay()
  );

  fps = new FormControl(DEFAULT_FRAME_RATE);
  fps$: Observable<number> = this.fps.valueChanges.pipe(
    startWith(this.fps.value),
    filter((fps) => fps > 0 && fps < 9000),
    shareReplay(),
  );

  videoInput$ = new Subject<File>();
  src$ = this.videoInput$.pipe(
    map((file) => URL.createObjectURL(file)),
    map((src) => this.sanitizer.bypassSecurityTrustUrl(src) as string),
    startWith('https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.ogv'),
    // startWith('https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.mp4')
  )

  constructor(
    readonly player: PlayerService,
    private readonly sanitizer: DomSanitizer,
  ) {
    this.player.color.next(this.color$);
    this.player.fps.next(this.fps$);
  }
}
