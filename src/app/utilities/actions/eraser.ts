import { Inject, Injectable } from '@angular/core';
import { AnonymousSubject } from 'rxjs/internal/Subject';

import { CompositeOperation } from '../brush/compositeOperation';

@Injectable()
export class Eraser extends AnonymousSubject<void> {

  isSelected$ = this.compositeOperation.isEraser$;

  constructor(
    @Inject(CompositeOperation) private readonly compositeOperation: CompositeOperation,
  ) {
    super();
  }

  next() {
    this.compositeOperation.next('destination-out');
  }

  error(err: any) {
    this.compositeOperation.error(err);
  }

  complete() {
    this.compositeOperation.complete();
  }
}
