import { Inject, Injectable } from '@angular/core';
import { mapTo, merge, Observable, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Frame } from 'src/app/interfaces/Frame';

import { KeyboardService } from '../keyboard.service';
import { KeyCode } from '../keycodes';


@Injectable()
export class OffsetByFrame extends AnonymousSubject<Frame> {
  constructor(
    @Inject(KeyboardService) keyboard: KeyboardService,
  ) {
    const destination = new Subject<Frame>()
    const source = merge(
      destination,
      keyboard.shortcut([KeyCode.ArrowRight]).pipe(mapTo(1)),
      keyboard.shortcut([KeyCode.ArrowLeft]).pipe(mapTo(-1)),
    ) as any as Observable<Frame>;;

    super(destination, source);
  }
}