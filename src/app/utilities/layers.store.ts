import { Inject, Injectable, OnDestroy } from '@angular/core';
import { select } from '@ngneat/elf';
import { addEntities, selectActiveEntity, selectEntities, setActiveId } from '@ngneat/elf-entities';
import { produce } from 'immer';
import { filter, Observable, Subscription } from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { VideoTime } from '../interfaces/VideoTime';
import { AppState, AppStore } from './app.store';
import { Entities, Annotation } from './entity';


export function write<S>(updater: (state: S) => void): (state: S) => S {
  return function (state) {
    return produce(state, (draft) => {
      updater(draft as S);
    });
  };
}




@Injectable()
export class Annotations {

  annotations$ = this.store.store.pipe(selectEntities());

  store$ = this.store;

  currentTime$ = this.store.store.pipe(select((state) => state.currentTime), filter((v) => !!v)) as Observable<VideoTime>;
  fps$ = this.store.store.pipe(select((state) => state.metadata.fps));
  src$ = this.store.store.pipe(select((state) => state.metadata.src));

  layer = new CurrentAnnotation(this.store);

  constructor(
    @Inject(AppStore) private store: AppStore,
  ) {}


  selectLayer(id: number): void {
    this.store.store.update(setActiveId(id));
  }

  addComment(): void {
    this.store.store.update(addEntities({
      id: 1,
      text: '',
    }),);
  }

  setTime(currentTime: VideoTime): void {
    this.store.updateNoHistory(write((state) => {
      state.currentTime = currentTime;
    }));
  }

  setFPS(fps: number): void {
    this.store.store.update(write((state) => {
      state.metadata.fps = fps;
    }))
  }

  getFPS(): number {
    return this.store.store.getValue().metadata.fps;
  }
}

export class CurrentAnnotation {

  current$ = this.store.store.pipe(selectActiveEntity());

  constructor(
    private readonly store: AppStore,
  ) {}

  add(frame: Frame, imageData: ImageData): void {

    this.store.store.update(
      addEntities({
        id: 1,
        image: imageData,
        frame: [frame, frame + 10 as Frame],
        text: '',
      }),
    );
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