import { XorshiftPRNG } from './xorshift/xorshift-prng';

export class ColorGenerator {
  private prng: XorshiftPRNG;

  constructor(seed: string) {
    this.prng = new XorshiftPRNG(seed);
  }

  public createColor(): string {
    const h = Math.floor(this.prng.randomize() * 360);
    const s = `${this.prng.randomize() * 60 + 40}%`;
    const l = `${(this.prng.randomize() + this.prng.randomize() + this.prng.randomize() + this.prng.randomize()) * 25}%`;
    return `hsl(${h}, ${s}, ${l})`;
  }
}
