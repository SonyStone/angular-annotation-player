import { inject, InjectionToken } from '@angular/core';
import { Observable, shareReplay, switchMap, withLatestFrom } from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { COMMENT_FILE_CHANGE } from './comment-file-change';
import { FILE_HANDLER } from './file-handler';

export const COMMENT_RESTORE = new InjectionToken<Observable<Map<Frame, ImageData>>>('scr', {
  providedIn: 'root',
  factory: () => {
    const in$ = inject(COMMENT_FILE_CHANGE);
    const fileHandler$ = inject(FILE_HANDLER);

    return in$.pipe(
      withLatestFrom(fileHandler$),
      switchMap(([file, fileHandler]) => fileHandler.restore(file)),
      shareReplay(),
    );
  },
})
