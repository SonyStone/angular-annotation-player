import { Injectable } from '@angular/core';
import { createState, Store, withProps } from '@ngneat/elf';
import { withActiveId, withEntities } from '@ngneat/elf-entities';
import produce from 'immer';
import { tap } from 'rxjs';
import { FRAME_RATES } from 'src/app/interfaces/FrameRate';

import { Frame } from '../../interfaces/Frame';

export interface AppState {
  metadata: {
    fps: number,
    src: string,
  },
  currentFrame: Frame | undefined;
  // entities: Annotation[],
  // currentEntityIndex: number | undefined;
}


export const DEFAULT_FRAME_RATE = FRAME_RATES[2].value;
export function createInitialState(): AppState {
  return {
    metadata: {
      fps: DEFAULT_FRAME_RATE,
      src: 'https://i.imgur.com/VITzz3j.mp4', // 10 frames
      // src: 'https://i.imgur.com/l6ObMoY.mp4', // 50 frames
      // src: 'https://r1---sn-aigzrn76.googlevideo.com/videoplayback?expire=1638843396&ei=pG-uYdK0OMKC1gahzoTYBg&ip=139.162.234.54&id=o-AE4Ptc9gCnO7dq5HE7x1ySvuWgvkVACD8sAdedyLcwpU&itag=137&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C394%2C395%2C396%2C397%2C398%2C399&source=youtube&requiressl=yes&mh=J2&mm=31%2C29&mn=sn-aigzrn76%2Csn-aigl6ner&ms=au%2Crdu&mv=m&mvi=1&pl=23&initcwndbps=201250&vprv=1&mime=video%2Fmp4&ns=6Hn48hg8RhiuHDInOF_mJFMG&gir=yes&clen=63534190&dur=301.040&lmt=1608511030645810&mt=1638821347&fvip=1&keepalive=yes&fexp=24001373%2C24007246&beids=24138380&c=WEB&txp=5535432&n=am3UfJuQQUicZr1J&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgb3nJItLQA5t7nP3YlWnYC_AcGQYgZcqTdk2qdgo8NeYCIQD0SzGXD4A72nJokd5oNesCRRv8xvc-vWjksdAitIdtoA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgQu9rAqKtCxhpl5NVHZHfUiqT-9ToF3M7ZdOkhLuJPH8CIAq7DtD0l0LI7eb0_vi4FC_KXaVC45tDh5jhhp64HIU9&ratebypass=yes',
      // src: 'https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.ogv',
      // src: 'https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.mp4',
    },
    currentFrame: undefined,
    // currentEntityIndex: undefined,
    // entities: [],
  };
}

export interface Annotation {
  id: number;
  frame?: [Frame, Frame];
  image?: ImageData;
  text?: string;
}

type StoreDef = AppState & {
  activeId: any;
} & {
  entities: Record<number, Annotation>;
  ids: number[];
}

export function write<S>(updater: (state: S) => void): (state: S) => S {
  return function (state) {
    return produce(state, (draft) => {
      updater(draft as S);
    });
  };
}



@Injectable()
export class AppStore extends Store<{ state: StoreDef, name: string, config: never }> {

  constructor() {
    const { state, config } = createState(
      withEntities<Annotation>(),
      withActiveId(),
      withProps<AppState>(createInitialState()),
    );

    super({ state, name: 'store', config });

    this.pipe(
      tap((v) => { console.log(`⚫`, v); }),
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}

