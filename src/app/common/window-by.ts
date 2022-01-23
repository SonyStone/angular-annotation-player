import { Observable, of } from 'rxjs';

export function windowBy<T extends PointerEvent>(fn: (value: T) => boolean) {
  return function(source: Observable<T>): Observable<Observable<T>> {
    return new Observable((subscriber) => source.subscribe({
        next(value) {
          if (fn(value)) {
            subscriber.next(of(value));
            subscriber.next(source);
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
