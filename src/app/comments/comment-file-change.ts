import { inject, InjectionToken } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

import { FILES_CHANGE } from '../files-change';

export const COMMENT_FILE_CHANGE = new InjectionToken<Observable<File>>('comment change', {
  providedIn: 'root',
  factory: () => {
    const files$ = inject(FILES_CHANGE);

    return files$.pipe(
      map((files) => Array.from(files)),
      map((files) => files.find(isJsonFile)!),
      filter((v) => !!v),
    );
  },
})

function isJsonFile(file: File) {
  return file.type === 'application/json';
}

