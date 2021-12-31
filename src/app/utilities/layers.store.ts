import { Inject, Injectable, OnDestroy } from '@angular/core';
import { createState, select, Store, withProps } from '@ngneat/elf';
import { stateHistory } from '@ngneat/elf-state-history';
import { produce } from 'immer';
import { Subscription } from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { VideoTime } from '../interfaces/VideoTime';
import { ControlsService } from './controls.service';
import { frameToVideoTime } from './videoTimeToFrame';

export interface LayersState {
  metadata: {
    fps: number,
    src: string,
    duration: VideoTime | undefined,
    width: number | undefined,
    height: number | undefined,
  },
  currentTime: VideoTime;
  currentLayerId: number,
  layers: { [key: Frame]: ImageData }[];
  comments: { text: string }[]
}

export const DEFAULT_FRAME_RATE = 29.97;
export function createInitialState(): LayersState {
  return {
    metadata: {
      fps: DEFAULT_FRAME_RATE,
      // src: 'https://r1---sn-aigzrn76.googlevideo.com/videoplayback?expire=1638843396&ei=pG-uYdK0OMKC1gahzoTYBg&ip=139.162.234.54&id=o-AE4Ptc9gCnO7dq5HE7x1ySvuWgvkVACD8sAdedyLcwpU&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&mh=J2&mm=31%2C29&mn=sn-aigzrn76%2Csn-aigl6ner&ms=au%2Crdu&mv=m&mvi=1&pl=23&initcwndbps=201250&vprv=1&mime=video%2Fmp4&ns=6Hn48hg8RhiuHDInOF_mJFMG&gir=yes&clen=63534190&dur=301.040&lmt=1608511030645810&mt=1638821347&fvip=1&keepalive=yes&fexp=24001373%2C24007246&beids=24138380&c=WEB&txp=5535432&n=am3UfJuQQUicZr1J&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgb3nJItLQA5t7nP3YlWnYC_AcGQYgZcqTdk2qdgo8NeYCIQD0SzGXD4A72nJokd5oNesCRRv8xvc-vWjksdAitIdtoA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgQu9rAqKtCxhpl5NVHZHfUiqT-9ToF3M7ZdOkhLuJPH8CIAq7DtD0l0LI7eb0_vi4FC_KXaVC45tDh5jhhp64HIU9&ratebypass=yes',
      src: 'https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.ogv',
      // src: 'https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.mp4',
      duration: undefined,
      width: undefined,
      height: undefined,
    },
    currentTime: 0 as VideoTime,
    currentLayerId: 0,
    layers: [],
    comments: [],
  };
}

export function write<S>(updater: (state: S) => void): (state: S) => S {
  return function (state) {
    return produce(state, (draft) => {
      updater(draft as S);
    });
  };
}

const { state, config } = createState(withProps<LayersState>(createInitialState()));

@Injectable()
export class LayersStore implements OnDestroy {

  store = new Store({
    state,
    name: 'auth',
    config
  });

  history = stateHistory(this.store, { maxAge: 25 });

  comments$ = this.store.pipe(select((state) => state.comments));

  currentLayerId$ = this.store.pipe(select((state) => state.currentLayerId));
  currentLayer$ = this.store.pipe(select((state) => state.layers[state.currentLayerId]));

  store$ = this.store.pipe((select((state) => state)));

  currentTime$ = this.store.pipe(select((state) => state.currentTime));
  fps$ = this.store.pipe(select((state) => state.metadata.fps));
  src$ = this.store.pipe(select((state) => state.metadata.src));

  layer = new Layer(this.store);

  private readonly subscription = new Subscription();

  constructor(
    @Inject(ControlsService) controls: ControlsService,
  ) {
    this.subscription.add(controls.undo$.subscribe(() => {
      this.history.undo();
    }));

    this.subscription.add(controls.redo$.subscribe(() => {
      this.history.redo();
    }));
  }

  ngOnDestroy(): void {
    this.store.destroy();
    this.history.destroy();
    this.subscription.unsubscribe();
  }

  set(data: LayersState) {
    this.store.update(() => data);
  }

  selectLayer(index: number): void {
    this.history.pause();
    this.store.update(write((state) => {
      state.currentLayerId = index;
    }));
    this.history.resume();
  }

  addComment(): void {
    this.store.update(write((state) => {
      const index = state.comments.push({ text: '' });
      state.layers.push({});
      state.currentLayerId = index - 1;
    }));
  }

  setTime(currentTime: VideoTime): void {
    this.history.pause();
    this.store.update(write((state) => {
      state.currentTime = currentTime;
    }));
    this.history.resume();
  }

  setFPS(fps: number): void {
    this.store.update(write((state) => {
      state.metadata.fps = fps;
    }))
  }

  getFPS(): number {
    return this.store.value.metadata.fps;
  }
}

export class Layer {

  current$ = this.store.pipe(
    select(({ layers, currentLayerId }) => layers[currentLayerId])
  );

  constructor(
    private readonly store: Store<any, LayersState>,
  ) {}

  getValue(): { [key: Frame]: ImageData} {
    const { currentLayerId, layers } = this.store.getValue();

    return layers[currentLayerId];
  }

  set(sequence: { [key: Frame]: ImageData}) {
    this.store.update(write((state) => { 
      state.layers[state.currentLayerId] = sequence;
    }));

    return this.getValue();
  }

  add(frame: Frame, imageData: ImageData) {
    this.store.update(write((state) => {
      if (state.layers[state.currentLayerId]) {
        state.layers[state.currentLayerId][frame] = imageData;
        state.currentTime = frameToVideoTime(frame, state.metadata.fps);
        state.currentLayerId = state.currentLayerId;
      }
    }));

    return this.getValue();
  }

  move(from: Frame, to: Frame) {
    this.store.update(write((state) => {
      const img = state.layers[state.currentLayerId][from]!;
      delete state.layers[state.currentLayerId][from];
  
      state.layers[state.currentLayerId][to] = img;
      state.currentLayerId = state.currentLayerId;
    }));

    return this.getValue();
  }

  remove(frame: Frame) {
    this.store.update(write((state) => { 
      delete state.layers[state.currentLayerId][frame];
      // state.currentFrame = frame;
      state.currentTime = frameToVideoTime(frame, state.metadata.fps);
      state.currentLayerId = state.currentLayerId;
    }));

    return this.getValue();
  }
}