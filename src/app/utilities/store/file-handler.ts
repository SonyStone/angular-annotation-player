import { Inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

import { CanvasOffscreen } from '../../common/CanvasOffscreen';
import { ImageFileHandler } from '../../common/FileHandler';
import { VideoDimensions } from '../video/video-dimensions';

@Injectable()
export class FileHandler extends Observable<ImageFileHandler<any>> {
  constructor(
    @Inject(VideoDimensions) dimensions$: VideoDimensions,
  ) {
    const offscreenCanvas$ = dimensions$.pipe(
      map((dimensions) => new CanvasOffscreen(dimensions.width, dimensions.height)),
    );
  
    const source = offscreenCanvas$.pipe(
      map((offscreenCanvas) => new ImageFileHandler(offscreenCanvas)),
      shareReplay(),
    );

    super((subscriber) => source.subscribe(subscriber));
  }
}