import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Frame } from 'src/app/interfaces/Frame';

import { OffsetByFrame } from './offset-by-frame';

@Injectable()
export class PreviousFrame extends Subject<void> {
  constructor(
    @Inject(OffsetByFrame) private readonly offsetByFrame: OffsetByFrame,
  ) {
    super();
  }

  next() {
    this.offsetByFrame.next(-1 as Frame);
  }

  error(err: any) {
    this.offsetByFrame.error(err);
  }

  complete() {
    this.offsetByFrame.complete();
  }
}