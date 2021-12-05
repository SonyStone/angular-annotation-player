import { first, fromEvent, merge, shareReplay, switchMap, switchMapTo, takeLast, takeUntil, tap } from 'rxjs';

export const pointerdown = (element: Element) => fromEvent<PointerEvent>(element, 'pointerdown').pipe(
  tap((evt) => {
    element.setPointerCapture(evt.pointerId);
    evt.preventDefault();
    evt.stopPropagation();
  }),
);

export const pointermove = (element: Element) => fromEvent<PointerEvent>(element, 'pointermove');

export const pointerup = (element: Element) => merge(
  fromEvent<PointerEvent>(element, 'pointerup'),
  fromEvent<PointerEvent>(element, 'pointerleave'),
  fromEvent<PointerEvent>(element, 'pointercancel'),
  // fromEvent<PointerEvent>(element, 'pointerout'),
).pipe(
  tap((evt) => {
    element.releasePointerCapture(evt.pointerId);
  }),
  first(),
);


export const pointerdrag = (
  element: Element,
) => {

  const down$ = pointerdown(element).pipe(

    shareReplay(),
  );
  const move$ = pointermove(element);
  const up$ = pointerup(element);

  return merge(
    down$,
    down$.pipe(switchMapTo(move$.pipe(takeUntil(up$)))),
    up$,
  );
}

