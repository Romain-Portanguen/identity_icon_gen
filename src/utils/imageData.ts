import { XorshiftPRNG } from './xorshift/xorshift-prng';

export class ImageDataGenerator {
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
      let row: number[] = [];
      for (let x = 0; x < dataWidth; x++) {
        row[x] = Math.floor(this.prng.randomize() * 2.3);
      }
      const mirroredRow = row.slice(0, mirrorWidth).reverse();
      row = row.concat(mirroredRow);
      data.push(...row);
    }

    return data;
  }
}