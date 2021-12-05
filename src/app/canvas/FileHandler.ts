import { Frame } from '../interfaces/Frame';
import { CanvasOffscreen } from './CanvasOffscreen';

export class FileHandler {

  constructor(
    private readonly canvas: CanvasOffscreen
  ) {}

  async restore(file: File): Promise<Map<Frame, ImageData>> {

    const reader = new FileReader();
    reader.readAsText(file);
  
    const str = await new Promise<string | ArrayBuffer>((resolve, reject) => {
      reader.onload = () => {
        const result = reader.result;
        result ? resolve(result) : reject();
      }
    });
  
    const entries = Object.entries(JSON.parse(str as string)) as [string,string][];
    
    const dataPromises = entries.map(([key, value]) => {
      const img = new Image();
      img.src = value;
  
      return new Promise<ImageData>((resolve, reject) => {
        img.onload = () => {
          const imageData = this.canvas.imageToImageData(img);
          resolve(imageData);
        }
      })
    });
  
    const data2 = await Promise.all(dataPromises);
  
    const filledData = entries.reduce((accumulator, [key, _], index) => {
      accumulator.set(parseInt(key, 10), data2[index]);
  
      return accumulator;
    }, new Map())
  
    return filledData;
  }

  async save(data: Map<Frame, ImageData>): Promise<File> {

    const base64Images: Promise<string | ArrayBuffer>[] = [];
    const keys: Frame[] = [];

    for (const [key, img] of data) {
      const base64 = this.canvas.imageDataToBlop(img).then((blob) => blobToBase64(blob));
      base64Images.push(base64);
      keys.push(key)
    }
  
    const images = await Promise.all(base64Images);
  
    const dataImages = images.reduce((accumulator, img, index) => {
      const key = keys[index];
      accumulator[key] = img;
      return accumulator;
    }, {} as { [key: string]: string | ArrayBuffer });
  
    const json = JSON.stringify(dataImages, (key, value) => {
      if (value instanceof ImageData) {
        return data.get(parseInt(key, 10) as Frame);
      }
  
      return value
    });

    const file = new File([json], 'foo.json', { type: 'text/json' });
  
    return file;
  }
}

const blobToBase64 = (blob: Blob): Promise<string | ArrayBuffer> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const result = reader.result;
      result
        ? resolve(result)
        : reject();
    };
  })
}