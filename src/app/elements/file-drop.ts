import { fromEvent, merge, Observable, of } from 'rxjs';
import { delay, distinctUntilChanged, mapTo, mergeMap, shareReplay, switchMapTo, takeUntil, tap } from 'rxjs/operators';


export class FilesDrop {

  constructor(
    private readonly element: HTMLElement,
  ) {}

  private readonly dragover$ = fromEvent<DragEvent>(this.element, 'dragover');
  private readonly dragleave$ = fromEvent<DragEvent>(this.element, 'dragleave').pipe(
      mergeMap((event) => of(event)
        .pipe(
          delay(300),
          takeUntil(this.dragover$),
        ),
      )
    );

  private readonly drop$ = fromEvent<DragEvent>(this.element, 'drop');

  readonly over$: Observable<boolean> = merge(
    this.dragover$.pipe(mapTo(true)),
    merge(this.dragleave$, this.drop$).pipe(mapTo(false)),
  ).pipe(
    distinctUntilChanged(),
    shareReplay(),
  );

  readonly dragAndDrop$: Observable<DragEvent> = this.dragover$.pipe(
    tap((evt: DragEvent) => {
      evt.preventDefault();
      evt.stopPropagation();
    }),
    switchMapTo(this.drop$),
    tap((evt: DragEvent) => {
      evt.preventDefault();
      evt.stopPropagation();
    }),
  );

}