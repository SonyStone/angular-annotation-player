import { map, Observable, switchMap } from 'rxjs';

import { resizeObservable } from '../common/resize-observable';
import { Dimensions } from '../interfaces/Dimensions.interface';

export function resize(
  element$: Observable<Element>
): Observable<Dimensions> {

  return element$.pipe(
    switchMap((element) => resizeObservable(element)),
    map((entries) => ({
      height: entries[0].contentRect.height,
      width: entries[0].contentRect.width,
    }))
  )
}