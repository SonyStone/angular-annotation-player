import { fromEvent, merge, Observable, switchMap, switchMapTo, takeUntil, tap } from "rxjs";

export const pointerdown = (element: Element) => fromEvent<PointerEvent>(element, 'pointerdown');
export const pointermove = (element: Element) => fromEvent<PointerEvent>(element, 'pointermove');
export const pointerup = (element: Element) => merge(
  fromEvent<PointerEvent>(element, 'pointerup'),
  fromEvent<PointerEvent>(element, 'pointerleave'),
);

export const pointerdrag = (
  element$: Observable<Element>,
  dragZone$: Observable<Element>,
) => element$.pipe(
  switchMap((element) => pointerdown(element)
    .pipe(
      tap((evt) => {
        evt.preventDefault();
        evt.stopPropagation();
      }),
      switchMap(() => dragZone$.pipe(switchMap((dragZone) => pointermove(dragZone).pipe(
        takeUntil(pointerup(dragZone)),
      )),
      )) 
    ),
));

export const pointerdrag_2 = (
  element: Element,
  dragZone: Element,
) => pointerdown(element).pipe(
  tap((evt) => {
    evt.preventDefault();
    evt.stopPropagation();
  }),
  switchMap(() => pointermove(dragZone).pipe(
    takeUntil(pointerup(dragZone)),
  )),
);