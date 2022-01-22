export class CanvasOffscreen {
  canvas = document.createElement('canvas');

  readonly ctx = this.canvas.getContext('2d')! as any as CanvasRenderingContext2D;

  readonly empty = this.ctx.createImageData(this.canvas.width, this.canvas.height);

  constructor(
    w: number,
    h: number
  ) {
    this.canvas.width = w;
    this.canvas.height = h;
  }

  imageToImageData(image: CanvasImageSource): ImageData {
    this.clear();
    this.drawImage(image);
    const imageData = this.getImageData();
    this.clear();
    
    return imageData;
  }

  getImageData(): ImageData {
    return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  drawImage(image: CanvasImageSource): void {
    this.ctx.drawImage(image, 0, 0);
  }

  clear(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  imageDataToBlop(imageData: ImageData): Promise<Blob> {
    this.ctx.putImageData(imageData, 0, 0)
  
    const blob = (this.canvas as any)[(this.canvas as any).convertToBlob
      ? 'convertToBlob'
      : 'toBlob'
    ]();
  
    return blob;
  };
}