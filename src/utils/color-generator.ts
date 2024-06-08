import { XorshiftPRNG } from './xorshift-prng';
import { ColorGeneratorProps } from './@types/color-generator.requirements';
import { 
  MAX_HUE, 
  MIN_SATURATION, 
  SATURATION_RANGE, 
  LIGHTNESS_SCALE, 
  LIGHTNESS_MULTIPLIER 
} from './@types/constants';
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
