import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { CompositeOperation } from '../brush/compositeOperation';

@Injectable()
export class Pen extends Subject<void> {

  isSelected$ = this.compositeOperation.isPen$;

  constructor(
    @Inject(CompositeOperation) private readonly compositeOperation: CompositeOperation,
  ) {
    super();
  }

  next() {
    this.compositeOperation.next('source-over');
  }

  error(err: any) {
    this.compositeOperation.error(err);
  }

  complete() {
    this.compositeOperation.complete();
  }
}
