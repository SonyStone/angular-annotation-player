import { map, merge, Observable, share } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { AnnotationStore } from "../interfaces/AnnotationStore.interface";
import { Frame } from "../interfaces/Frame";
import { paintStore } from "./PaintData";

export const imageDataStore = (
  restore$: Observable<AnnotationStore>,
  put$: Observable<[ImageData, Frame]>,
  remove$: Observable<number>,
) => paintStore(merge(
  put$.pipe(
    map(([imageData, frame]) => (store: AnnotationStore) => {
      store[frame] = imageData;

      return store;
    })
  ),
  remove$.pipe(
    map((index) => (store: AnnotationStore) => {
      delete store[index];

      return store;
    })
  ),
  restore$.pipe(
    map((data) => () => data),
  ),
)).pipe(
  shareReplay(),
)
