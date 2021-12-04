import { AnnotationStore } from "../interfaces/AnnotationStore.interface";
import { Canvas } from "./Canvas";

export class FileHandler {

  constructor(
    private readonly canvas: Canvas
  ) {}

  async restore(file: File): Promise<AnnotationStore> {

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
      accumulator[key] = data2[index];
  
      return accumulator;
    }, {} as { [key: string]: ImageData })
  
    return filledData;
  }

  async save(data: AnnotationStore): Promise<File> {

    const list = Object.entries(data) as [string, ImageData][];
  
    const base64Images = list.map(async ([_, img]) => {
  
      const blob = await this.canvas.imageDataToBlop(img);
      const base64 = await blobToBase64(blob);
  
      return base64;
    });
  
    const images = await Promise.all(base64Images);
  
    const dataImages = images.reduce((accumulator, img, index) => {
      const key = list[index][0]
      accumulator[key] = img;
      return accumulator;
    }, {} as { [key: string]: string | ArrayBuffer });
  
    const json = JSON.stringify(dataImages, (key, value) => {
      if (value instanceof ImageData) {
        return data[key];
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