import { Inject, Injectable } from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';

import { KeyboardService } from '../keyboard.service';
import { KeyCode } from '../keycodes';

@Injectable()
export class Play extends AnonymousSubject<void> {
  constructor(
    @Inject(KeyboardService) keyboard: KeyboardService,
  ) {
    const destination = new Subject<void>()
    const source = merge(
      destination,
      keyboard.shortcut(KeyCode.KeyP),
      keyboard.shortcut(KeyCode.Space),
    ) as any as Observable<void>;

    super(destination, source);
  }
}