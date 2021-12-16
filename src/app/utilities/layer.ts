import { KeyValue } from "@angular/common";
import { Frame } from "../interfaces/Frame";

export class Layer {
  private store: { [key: Frame]: ImageData} = {}

  clone(): Layer {
    const layer = new Layer();
    layer.set(this.store);

    return layer;
  }

  set(data: { [key: Frame]: ImageData}): this {
    this.store =  { ...data };

    return this;
  }

  add(frame: Frame, imageData: ImageData): this {
    this.store = { ...this.store, [frame]: imageData }

    return this;
  }

  remove(frame: Frame): this {
    const nextStore = { ...this.store };
    delete nextStore[frame];
    this.store = nextStore;

    return this;
  }

  move(from: Frame, to: Frame): this {
    const img = this.store[from]!;
    delete this.store[from];

    this.store[to] = img;

    return this;
  }

  get(frame: Frame): ImageData | undefined {
    // return closest(frame, this.store);
    return this.store[frame];
  }

  getClosest(frame: Frame): ImageData | undefined {
    for (let i = frame; i >= 0; i--) {
      const image = this.store[i];

      if (image) {
        return image;
      }
    }
  
    return undefined;
  }

  getAll(): { [key: Frame]: ImageData } {
    return this.store;
  }

  getArray(): KeyValue<Frame, ImageData>[] {
    const array = [];
    const object = this.store;
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const frame = parseInt(key, 10) as Frame;
        const imageData = object[frame];

        array.push({ key: frame, value: imageData })
        
      }
    }

    return array;
  }
}
