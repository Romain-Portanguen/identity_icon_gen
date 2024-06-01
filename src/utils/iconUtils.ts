import { CanvasOpts, IconOpts } from '../@types/types';
import { RESOLUTION } from '../@types/constants';
import ColorGenerator from './color';
import ImageDataGenerator from './imageData';

// Generate a random seed if not provided

const generateRandomSeed = (): string => {
  return Math.floor(Math.random() * Math.pow(10, 16)).toString(16);
};

// Build options object with defaults

const buildOpts = (opts: IconOpts): CanvasOpts => {
  const scale = opts.size / RESOLUTION;

  const seed = opts.seed || generateRandomSeed();
  const colorGen = new ColorGenerator(seed);

  return {
    ...opts,
    seed,
    size: RESOLUTION,
    scale,
    color: opts.color || colorGen.createColor(),
    backgroundColor: opts.backgroundColor || colorGen.createColor(),
    spotcolor: opts.spotcolor || colorGen.createColor(),
  };
};

// Draw the background color on the canvas

const drawBackground = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
};

// Draw a pixel on the canvas

const drawPixel = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) => {
  ctx.fillStyle = color;
  ctx.fillRect(x * size, y * size, size, size);
};

// Draw the icon on the canvas

const renderIcon = (opts: CanvasOpts, canvas: HTMLCanvasElement): HTMLCanvasElement => {
  const imageDataGen = new ImageDataGenerator(opts.seed || '');
  const imageData = imageDataGen.createImageData(opts.size);
  const width = Math.sqrt(imageData.length);
  canvas.width = canvas.height = opts.size * opts.scale;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    drawBackground(ctx, canvas.width, canvas.height, opts.backgroundColor as string);

    for (let i = 0; i < imageData.length; i++) {
      const row = Math.floor(i / width);
      const col = i % width;
      if (imageData[i]) {
        const color = imageData[i] === 1 ? (opts.color as string) : (opts.spotcolor as string);
        drawPixel(ctx, col, row, opts.scale, color);
      }
    }
  }

  return canvas;
};

export { buildOpts, renderIcon };
