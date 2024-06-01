class XorshiftPRNG {
  private seed: number[] = [0, 0, 0, 0];

  constructor(seed: string) {
    this.seedRand(seed);
  }

  private seedRand(seed: string): void {
    this.seed.fill(0);
    for (let i = 0; i < seed.length; i++) {
      this.seed[i % 4] = (this.seed[i % 4] << 5) - this.seed[i % 4] + seed.charCodeAt(i);
    }
  }

  public rand(): number {
    const t = this.seed[0] ^ (this.seed[0] << 11);
    this.seed[0] = this.seed[1];
    this.seed[1] = this.seed[2];
    this.seed[2] = this.seed[3];
    this.seed[3] = this.seed[3] ^ (this.seed[3] >> 19) ^ t ^ (t >> 8);
    return (this.seed[3] >>> 0) / ((1 << 31) >>> 0);
  }
}

export default XorshiftPRNG;
