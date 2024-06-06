import { XorshiftPRNG } from './xorshift-prng';
import { ColorGeneratorProps } from './color-generator.requirements';

const MAX_HUE = 360;
const MIN_SATURATION = 40;
const SATURATION_RANGE = 60;
const LIGHTNESS_MULTIPLIER = 25;
const LIGHTNESS_SCALE = 4;

export class ColorGenerator implements ColorGeneratorProps {
  private prng: XorshiftPRNG;

  constructor(seed: string) {
    this.prng = new XorshiftPRNG(seed);
  }

  public createColor(): string {
    const hue = Math.floor(this.prng.randomize() * MAX_HUE);
    const saturation = `${this.getRandomSaturation()}%`;
    const lightness = `${this.getRandomLightness()}%`;

    return `hsl(${hue}, ${saturation}, ${lightness})`;
  }

  private getRandomSaturation(): number {
    return this.prng.randomize() * SATURATION_RANGE + MIN_SATURATION;
  }

  private getRandomLightness(): number {
    return (this.prng.randomize() * LIGHTNESS_SCALE) * LIGHTNESS_MULTIPLIER;
  }
}
