import { Inject, Injectable } from '@angular/core';
import { select } from '@ngneat/elf';

import { Frame } from '../../interfaces/Frame';
import { Annotation, AppStore } from './app.store';



export class Entities {
  static getImage(self: Annotation[], frame: Frame): ImageData | undefined {
    for (const entity of self) {
      const from = entity.frame?.[0];
      const to = entity.frame?.[1];
      
      if (from && to && frame >= from && frame <= to) {
        return entity.image;
      }
    }
  
    return undefined;
  }
  
  static getEntity(self: Annotation[], currentEntityIndex: number | undefined): Annotation | undefined {
    return currentEntityIndex ? self[currentEntityIndex] : undefined;
  }

  static isInFrame(self: Annotation | undefined, frame: Frame): boolean {
    return !!(self && self.frame?.[0] && self.frame?.[1] && frame >= self.frame[0] && frame <= self.frame[1]);
  }

}


@Injectable()
export class Annotations {

  annotations$ = this.store.pipe(select((state) => state.annotations));

  store$ = this.store;

  constructor(
    @Inject(AppStore) private store: AppStore,
  ) {}


  selectLayer(id: number): void {
    // this.store.update(setActiveId(id));
  }

  addComment(): void {
    this.store.update((state) => {
      state.annotations.push({
        text: '',
      })
    });
  }
}

@Injectable()
export class CurrentAnnotation {

  current$ = this.store.pipe(select((state) => state.annotations?.[0] ?? undefined ));

  constructor(
    @Inject(AppStore) private store: AppStore,
  ) {}

  add(frame: Frame, imageData: ImageData): void {
    this.store.update((state) => {
      state.annotations.push({
        image: imageData,
        frame: [frame, frame + 10 as Frame],
        text: '',
      })
    });
  }

  move(from: Frame, to: Frame): void {
    // this.store.update(write((state) => {
    //   const img = state.layers[state.currentLayerId][from]!;
    //   delete state.layers[state.currentLayerId][from];
  
    //   state.layers[state.currentLayerId][to] = img;
    //   state.currentLayerId = state.currentLayerId;
    // }));

  }

  remove(frame: Frame): void {
    // this.store.update(write((state) => {
    //   const currentEntity = getEntity(state.entities, state.currentEntityIndex);
    //   if (currentEntity) {
    //     delete currentEntity.image;
    //     delete currentEntity.frame;
    //     state.currentTime = frameToVideoTime(frame, state.metadata.fps);
    //   }

    //   state.currentEntityIndex = state.currentEntityIndex;
    // }));

  }
}