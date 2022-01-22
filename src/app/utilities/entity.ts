import { Frame } from "../interfaces/Frame";

export interface Annotation {
  id: number;
  frame?: [Frame, Frame];
  image?: ImageData;
  text?: string;
}

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
