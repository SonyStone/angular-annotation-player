import { Component, Inject, Injectable, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs';

import { LayersStore } from '../utilities/layers.store';
import { VideoService } from '../utilities/video.service';

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
  control = new FormControl(this.store.getFPS());
  private subscription = this.control.valueChanges.pipe(
    filter((fps) => fps > 0 && fps < 9000),
  ).subscribe((fps) => {
    this.store.setFPS(fps)
  })

  constructor(
    @Inject(LayersStore) private readonly store: LayersStore,
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