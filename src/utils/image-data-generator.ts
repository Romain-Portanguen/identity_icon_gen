import { XorshiftPRNG } from './xorshift-prng';
import { ImageDataGeneratorProps } from './image-data-generator.requirements';

export class ImageDataGenerator implements ImageDataGeneratorProps {
  private prng: XorshiftPRNG;

  constructor(seed: string) {
    this.prng = new XorshiftPRNG(seed);
  }

  public createImageData(size: number): number[] {
    const width = size;
    const height = size;
    const dataWidth = Math.ceil(width / 2);
    const mirrorWidth = width - dataWidth;
    const data: number[] = [];

    for (let y = 0; y < height; y++) {
      const row = this.generateMirroredRow(dataWidth, mirrorWidth);
      data.push(...row);
    }

    return data;
  }

  private generateMirroredRow(dataWidth: number, mirrorWidth: number): number[] {
    const row = Array(dataWidth).fill(0).map(() => Math.floor(this.prng.randomize() * 2.3));
    const mirroredRow = row.slice(0, mirrorWidth).reverse();
    return row.concat(mirroredRow);
  }
}
