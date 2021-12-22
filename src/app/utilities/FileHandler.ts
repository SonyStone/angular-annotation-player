import { CanvasOffscreen } from './CanvasOffscreen';

export class FileHandler<T> {

  constructor(
    private readonly canvas: CanvasOffscreen
  ) {}

  async restore(file: File): Promise<T> {
    const json = await readJsonFile(file);
    const base64Images: string[] = getBase64List(json);
    const images = await Promise.all(base64Images
      .map((item) => base64ToImage(item)
        .then((image) => this.canvas.imageToImageData(image)))
    );
    const map = mapTwoArrays(base64Images, images);
    return getData(json, map);
  }

  async save(data: T): Promise<File> {
    const images: ImageData[] = getImageDataList(data);
    const base64Images = await Promise.all(
      images
        .map((img) => this.canvas.imageDataToBlop(img)
          .then((blob) => blobToBase64(blob))));
    const map = mapTwoArrays(images, base64Images);
    const json = getJson(data, map);
    return createJsonFile(json);
  }
}








function blobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
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

function base64ToImage(base64: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      resolve(img);
    }
  })
}

function readJsonFile(file: File): Promise<string> {
  const reader = new FileReader();
  reader.readAsText(file);

  return new Promise<string>((resolve, reject) => {
    reader.onload = () => {
      const result = reader.result;
      result
        ? resolve(result as string)
        : reject();
    }
  });
}

function getImageDataList(data: any) {
  const images: ImageData[] = [];

  JSON.stringify(data, (_, value) => {
    if (value instanceof ImageData) {
      return images.push(value);
    }

    return value
  });

  return images;
}

function getBase64List(json: string): string[] {
  const base64Images: string[] = [];

  JSON.parse(json, (_, value) => {
    if (typeof value === 'string' && value.startsWith('data:image/png;base64')) {
      base64Images.push(value);
    }

    return value;
  });

  return base64Images;
}

function getData(json: string, map: Map<string | ArrayBuffer, ImageData>): any {
  return JSON.parse(json, (key, value) => {
      
    if (typeof value === 'string' && map.has(value)) {
      return map.get(value);
    }

    return value;
  });
}

function getJson(data: any, map: Map<ImageData, string | ArrayBuffer>): string {
  return JSON.stringify(data, (_, value) => {
    if (value instanceof ImageData && map.has(value)) {
      return map.get(value);
    }
  
    return value
  });

}

function createJsonFile(json: string): File {
  return new File([json], 'foo.json', { type: 'text/json' });
}

function mapTwoArrays<K, V>(array1: K[], array2: V[]): Map<K, V> {
  return new Map(array1.map((key, i) => [key, array2[i]]));
}