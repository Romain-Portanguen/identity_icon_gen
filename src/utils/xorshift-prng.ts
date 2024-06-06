import { XorshiftPRNGProps } from './xorshift-prng.requirements';

export class XorshiftPRNG implements XorshiftPRNGProps {
  public seed: number[] = [0, 0, 0, 0];

  constructor(seed: string) {
    this.initializeSeed(seed);
  }

  public initializeSeed(seed: string): void {
    this.seed.fill(0);
    for (let i = 0; i < seed.length; i++) {
      this.seed[i % 4] = this.updateSeedValue(this.seed[i % 4], seed.charCodeAt(i));
    }
  }

  public randomize(): number {
    const t = this.seed[0] ^ (this.seed[0] << 11);
    this.shiftSeedValues();
    this.seed[3] = this.updateFinalSeedValue(this.seed[3], t);
    return this.normalizeSeedValue(this.seed[3]);
  }
  
  private updateSeedValue(currentValue: number, charCode: number): number {
    return (currentValue << 5) - currentValue + charCode;
  }

  private shiftSeedValues(): void {
    this.seed[0] = this.seed[1];
    this.seed[1] = this.seed[2];
    this.seed[2] = this.seed[3];
  }

  private updateFinalSeedValue(currentValue: number, t: number): number {
    return currentValue ^ (currentValue >> 19) ^ t ^ (t >> 8);
  }

  private normalizeSeedValue(value: number): number {
    return (value >>> 0) / ((1 << 31) >>> 0);
  }
}
