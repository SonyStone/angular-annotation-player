import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { VideoDimensions } from 'src/app/utilities/video/video-dimensions';

import { VideoSrc } from '../../utilities/video/video-src';
import { CanvasTransform } from './canvas-transform';




@Component({
  selector: 'player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    CanvasTransform,
  ],
})

export class PlayerComponent {
  constructor(
    @Inject(VideoSrc) readonly videoSrc$: VideoSrc,
    @Inject(CanvasTransform) readonly canvasTransform$: CanvasTransform,
    @Inject(VideoDimensions) readonly dimensions$: VideoDimensions,
  ) { }
}


