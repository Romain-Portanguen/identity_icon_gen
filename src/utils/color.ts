import XorshiftPRNG from './prng';

class ColorGenerator {
  private prng: XorshiftPRNG;

  constructor(seed: string) {
    this.prng = new XorshiftPRNG(seed);
  }

  public createColor(): string {
    const h = Math.floor(this.prng.rand() * 360);
    const s = `${this.prng.rand() * 60 + 40}%`;
    const l = `${(this.prng.rand() + this.prng.rand() + this.prng.rand() + this.prng.rand()) * 25}%`;
    return `hsl(${h}, ${s}, ${l})`;
  }
}

export default ColorGenerator;
