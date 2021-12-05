import { inject, InjectionToken } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';

import { FILES_CHANGE } from '../files-change';

export const VIDEO_FILE_CHANGE = new InjectionToken<Observable<File>>('file change', {
  providedIn: 'root',
  factory: () => {
    const files$ = inject(FILES_CHANGE);

    return files$.pipe(
      map((files) => Array.from(files)),
      map((files) => files.find(isVideoFile)!),
      filter((v) => !!v),
    );
  },
})

function isVideoFile(file: File) {
  return file.type === 'video/mp4';
}

