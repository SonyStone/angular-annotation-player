import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Injectable()
export class Rewind extends AnonymousSubject<PointerEvent> {
  constructor() {
    const destination = new Subject<PointerEvent>()
    const source = destination;

    super(destination, source);
  }
}