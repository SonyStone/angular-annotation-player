import { Observable, scan } from "rxjs";
import { shareReplay } from "rxjs/operators";

export const store = <T>(actions$: Observable<(store: T) => T>, init = {} as T): Observable<T> => actions$.pipe(
  scan((accumulator, fn) => fn(accumulator), init),
  shareReplay(),
);
