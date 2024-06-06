import { XorshiftPRNG } from './xorshift-prng';

describe('The XorshiftPRNG class', () => {
  let prng: XorshiftPRNG;

  beforeEach(() => {
    prng = new XorshiftPRNG('seed');
  });

  it('Should initialize seed correctly', () => {
    expect(prng.seed).toHaveLength(4);
    expect(prng.seed).not.toEqual([0, 0, 0, 0]);
  });

  it('Should generate a number between 0 and 1', () => {
    const num = prng.randomize();
    expect(num).toBeGreaterThanOrEqual(0);
    expect(num).toBeLessThan(1);
  });

  it('Should generate different numbers on successive calls', () => {
    const num1 = prng.randomize();
    const num2 = prng.randomize();
    expect(num1).not.toEqual(num2);
  });
});
