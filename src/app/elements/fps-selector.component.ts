import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { VideoFPS } from '../utilities/video/video-fps';

@Component({
  selector: 'frame-rate-selector',
  template: `

    <span>frame rate: {{ fps$ | push }}</span>
    <select [ngModel]="fps$ | push" (ngModelChange)="fps$.next($event)">
      <option *ngFor="let item of fps$.frameRates"
              [ngValue]="item.value">{{ item.name }}</option>
    </select>
    <input type="number"
           [ngModel]="fps$ | push"
           (ngModelChange)="fps$.next($event)">

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FrameRateSelectorComponent {
  constructor(
    @Inject(VideoFPS) readonly fps$: VideoFPS,
  ) { }
}