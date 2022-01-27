import { Inject, Injectable } from '@angular/core';
import { merge } from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';
import { Frame } from 'src/app/interfaces/Frame';
import { VideoCurrentFrame } from 'src/app/utilities/video/video-current-frame';

import { SliderTransform } from './slider-transform';

@Injectable()
export class ThumbTranslate extends AnonymousSubject<number> {
  constructor(
    @Inject(SliderTransform) translate$: SliderTransform,
  ) {
    const destination = new Subject<number>()
    const source = merge(destination, translate$);

    super(destination, source);
  }
}

@Injectable()
export class ThumbFrame extends AnonymousSubject<Frame> {
  constructor(
    @Inject(VideoCurrentFrame) frame$: VideoCurrentFrame,
  ) {
    const destination = new Subject<Frame>()
    const source = merge(destination, frame$);

    super(destination, source);
  }
}