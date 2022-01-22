import { Inject, Injectable } from '@angular/core';
import { delay, merge } from 'rxjs';
import { AnonymousSubject, Subject } from 'rxjs/internal/Subject';

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