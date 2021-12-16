import { exhaustMap, first, fromEvent, merge, startWith, takeUntil, tap } from 'rxjs';


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
) => pointerdown(element).pipe(
    exhaustMap((downEvent) => pointermove(element).pipe(
      startWith(downEvent),
      takeUntil(pointerup(element))
    ),
  ),
);
