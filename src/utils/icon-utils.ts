import { RESOLUTION } from './@types/constants';
import { ColorGenerator } from './color-generator';
import { ImageDataGenerator } from './image-data-generator';
import { CanvasOptions, IconOptions, IconUtilsProps } from './@types/icon-utils.requirements';

const DEFAULT_SEED_LENGTH = 16;
const RANDOM_SEED_MULTIPLIER = Math.pow(10, DEFAULT_SEED_LENGTH);

export class IconUtils implements IconUtilsProps {
  private static generateRandomSeed(): string {
    let seed = Math.floor(Math.random() * RANDOM_SEED_MULTIPLIER).toString(16);
    while (seed.length < DEFAULT_SEED_LENGTH) {
      seed = '0' + seed;
    }
    return seed;
  }

  public static buildOptions(options: IconOptions): CanvasOptions {
    const scale = options.size / RESOLUTION;
    const seed = options.seed || this.generateRandomSeed();
    const colorGen = new ColorGenerator(seed);

    const color = options.color || colorGen.createColor();
    const backgroundColor = options.backgroundColor || colorGen.createColor();
    const spotcolor = options.spotcolor || colorGen.createColor();

    return {
      ...options,
      seed,
      size: RESOLUTION,
      scale,
      color,
      backgroundColor,
      spotcolor,
    };
  }

  public static renderIcon(options: CanvasOptions, canvas: HTMLCanvasElement): HTMLCanvasElement {
    const canvasContext = this.setupCanvas(options, canvas);
    const imageData = this.generateImageData(options);

    if (canvasContext) {
      this.drawBackground(canvasContext, canvas.width, canvas.height, options.backgroundColor);
      this.drawImageData(canvasContext, imageData, options);
    }

    return canvas;
  }

  private static setupCanvas(options: CanvasOptions, canvas: HTMLCanvasElement): CanvasRenderingContext2D | null {
    canvas.width = canvas.height = options.size * options.scale;
    return canvas.getContext('2d');
  }

  private static generateImageData(options: CanvasOptions): number[] {
    const imgDataGenerator = new ImageDataGenerator(options.seed);
    return imgDataGenerator.createImageData(options.size);
  }

  private static drawBackground(
    canvasContext: CanvasRenderingContext2D,
    width: number,
    height: number,
    color: string
  ): void {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(0, 0, width, height);
  }

  private static drawImageData(
    canvasContext: CanvasRenderingContext2D,
    imageData: number[],
    options: CanvasOptions
  ): void {
    const width = Math.sqrt(imageData.length);

    imageData.forEach((pixel, index) => {
      if (pixel) {
        const row = Math.floor(index / width);
        const col = index % width;
        const color = pixel === 1 ? options.color : options.spotcolor;
        this.drawPixel(canvasContext, col, row, options.scale, color);
      }
    });
  }

  private static drawPixel(
    canvasContext: CanvasRenderingContext2D,
    positionX: number,
    positionY: number,
    size: number,
    color: string
  ): void {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(positionX * size, positionY * size, size, size);
  }

  public buildOptions(options: IconOptions): CanvasOptions {
    return IconUtils.buildOptions(options);
  }

  public renderIcon(options: CanvasOptions, canvas: HTMLCanvasElement): HTMLCanvasElement {
    return IconUtils.renderIcon(options, canvas);
  }
}
