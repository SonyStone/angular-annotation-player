import { Inject, Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

import { KeyboardService } from '../keyboard.service';
import { KeyCode } from '../keycodes';



@Injectable()
export class Redo extends AnonymousSubject<void> {
  constructor(
    @Inject(KeyboardService) keyboard: KeyboardService,
  ) {
    const destination = new Subject<void>()
    const source = merge(
      keyboard.shortcut([KeyCode.ControlLeft, KeyCode.KeyY]),
      keyboard.shortcut([KeyCode.ControlRight, KeyCode.KeyY])
    ) as any as Observable<void>;;

    super(destination, source);
  }
}