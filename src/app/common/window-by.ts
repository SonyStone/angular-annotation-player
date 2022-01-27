import { Observable, of, startWith } from 'rxjs';

export function windowBy<T>(fn: (value: T) => boolean) {
  return function(source: Observable<T>): Observable<Observable<T>> {
    return new Observable((subscriber) => source.subscribe({
        next(value) {
          if (fn(value)) {
            subscriber.next(source.pipe(startWith(value)));
          }
        },
        error(error) {
          subscriber.error(error);
        },
        complete() {
          subscriber.complete();
        }
      })
    )
  }
}
