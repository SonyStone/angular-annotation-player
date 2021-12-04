const noop = (_?: any) => {};

export const dummyCanvasContext: CanvasRenderingContext2D = {
  canvas: {} as HTMLCanvasElement,
  direction: 'ltr',
  fillStyle: '#000000',
  filter: 'none',
  font: '10px sans-serif',
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  imageSmoothingEnabled: true,
  imageSmoothingQuality: 'low',
  lineCap: 'butt',
  lineDashOffset: 0,
  lineJoin: 'miter',
  lineWidth: 1,
  miterLimit: 10,
  shadowBlur: 0,
  shadowColor: 'rgba(0, 0, 0, 0)',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  strokeStyle: '#000000',
  textAlign: 'start',
  textBaseline: 'alphabetic',
  save: noop,
  restore: noop,
  scale: noop,
  rotate: noop,
  translate: noop,
  transform: noop,
  setTransform: noop,
  getTransform: () => new DOMMatrix(),
  resetTransform: noop,
  createLinearGradient: () => ({ addColorStop: noop }),
  createRadialGradient: () => ({ addColorStop: noop }),
  createPattern: () => null,
  clearRect: noop,
  fillRect: noop,
  strokeRect: noop,
  beginPath: noop,
  fill: noop,
  stroke: noop,
  drawFocusIfNeeded: noop,
  getContextAttributes: () => ({}),
  clip: noop,
  isPointInPath: () => false,
  isPointInStroke: () => false,
  fillText: noop,
  strokeText: noop,
  measureText: () => ({
    actualBoundingBoxAscent: 0,
    actualBoundingBoxDescent: 0,
    actualBoundingBoxLeft: 0,
    actualBoundingBoxRight: 0,
    alphabeticBaseline: 0,
    emHeightAscent: 0,
    emHeightDescent: 0,
    fontBoundingBoxAscent: 0,
    fontBoundingBoxDescent: 0,
    hangingBaseline: 0,
    ideographicBaseline: 0,
    width: 0,
  }),
  drawImage: noop,
  getImageData: () => new ImageData(1, 1),
  putImageData: noop,
  createImageData: () => new ImageData(1, 1),
  setLineDash: noop,
  getLineDash: () => [],
  closePath: noop,
  moveTo: noop,
  lineTo: noop,
  quadraticCurveTo: noop,
  bezierCurveTo: noop,
  arcTo: noop,
  rect: noop,
  arc: noop,
  ellipse: noop,
};