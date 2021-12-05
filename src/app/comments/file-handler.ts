import { inject, InjectionToken } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { CANVAS_CONTEXT } from '../canvas/canvas-context';
import { CanvasOffscreen } from '../canvas/CanvasOffscreen';
import { FileHandler } from '../canvas/FileHandler';

export const FILE_HANDLER = new InjectionToken<Observable<FileHandler>>('file handler', {
  providedIn: 'root',
  factory: () => {

    const ctx$ = inject(CANVAS_CONTEXT);

    const offscreenCanvas$ = ctx$.pipe(
      map(({ canvas }) => new CanvasOffscreen(canvas.offsetWidth, canvas.offsetHeight))
    );

    const fileHandler$ = offscreenCanvas$.pipe(
      map((offscreenCanvas) => new FileHandler(offscreenCanvas)),
      shareReplay(),
    );

    return fileHandler$;
  },
})
