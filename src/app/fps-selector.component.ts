import { Component, Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs';
import { VideoService } from './video/video.service';

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

@Injectable()
export class FrameRateService implements OnDestroy {
  control = new FormControl(this.video.fps$.value);
  private subscription = this.control.valueChanges.pipe(
    filter((fps) => fps > 0 && fps < 9000),
  ).subscribe((fps) => {
    this.video.fps$.next(fps)
  })

  constructor(
    @Inject(VideoService) private readonly video: VideoService,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


@Component({
  selector: 'frame-rate-selector',
  template: `

    <span>frame rate: {{ video.fps$ | push }}</span>
    <select [formControl]="frameRate.control">
      <option *ngFor="let item of frameRates"
              [ngValue]="item.value">{{ item.name }}</option>
    </select>
    <input [value]="frameRate.control.value"
           type="number"
           [formControl]="frameRate.control">

  `,
  providers: [
    FrameRateService,
  ]
})

export class FrameRateSelectorComponent {

  frameRates = FRAME_RATES;

  constructor(
    readonly frameRate: FrameRateService,
    @Inject(VideoService) readonly video: VideoService,
  ) { }
}