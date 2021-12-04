import { Observable, scan, share } from "rxjs";
import { shareReplay } from "rxjs/operators";

export const paintStore = <T>(actions$: Observable<(store: T) => T>, init = {} as T): Observable<T> => actions$.pipe(
  scan((accumulator, fn) => fn(accumulator), init),
  shareReplay(),
);
