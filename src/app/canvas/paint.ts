import { map, switchMap, takeUntil } from "rxjs";
import { stroke } from "../croquis/brush/simple";
import { getStylusState } from "../croquis/stylus";
import { pointerdown, pointermove, pointerup } from "../events/pointer";


export function paint(
  element: Element,
  ctx: CanvasRenderingContext2D,
  color: string,
) {
  return pointerdown(element).pipe(
    map((event) => stroke.down({
      ctx,
      color,
      size: 20,
    }, getStylusState(event))),

    switchMap((drawingContext) => pointermove(element).pipe(
      map((event) => drawingContext.move(getStylusState(event))),
      takeUntil(pointerup(element).pipe(
        map((event) => drawingContext.up(getStylusState(event)))
      )),
    )),
  )
}

