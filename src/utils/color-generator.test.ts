import { ColorGenerator } from './color-generator';

jest.mock('./xorshift-prng', () => {
  return {
    XorshiftPRNG: jest.fn().mockImplementation((seed: string) => {
      const seedValues: { [key: string]: number[] } = {
        'test-seed-1': [0.5, 0.5, 0.5, 0.5],
        'test-seed-2': [0.3, 0.3, 0.3, 0.3]
      };
      const randomValues = seedValues[seed] || [0.1, 0.1, 0.1, 0.1];
      let callCount = 0;

      return {
        randomize: jest.fn(() => randomValues[callCount++ % randomValues.length])
      };
    })
  };
});

describe('The ColorGenerator class', () => {
  it('Should create a valid HSL color string', () => {
    const seed = 'test-seed';
    const generator = new ColorGenerator(seed);

    const color = generator.createColor();
    
    expect(color).toMatch(/^hsl\(\d+, \d+%, \d+%\)$/);
  });

  it('Should generate the correct hue based on the mocked random value', () => {
    const seed = 'test-seed';
    const generator = new ColorGenerator(seed);

    const color = generator.createColor();
    
    const hue = parseInt(color.match(/^hsl\((\d+), \d+%, \d+%\)$/)?.[1] || '0', 10);
    expect(hue).toBe(36);
  });

  it('Should generate the correct saturation based on the mocked random value', () => {
    const seed = 'test-seed';
    const generator = new ColorGenerator(seed);

    const color = generator.createColor();

    const saturation = parseInt(color.match(/^hsl\(\d+, (\d+)%?, \d+%\)$/)?.[1] || '0', 10);
    expect(saturation).toBe(46);
  });

  it('Should generate the correct lightness based on the mocked random value', () => {
    const seed = 'test-seed';
    const generator = new ColorGenerator(seed);

    const color = generator.createColor();

    const lightness = parseInt(color.match(/^hsl\(\d+, \d+%, (\d+)%\)$/)?.[1] || '0', 10);
    expect(lightness).toBe(10);
  });

  it('Should generate different colors for different seeds', () => {
    const seed1 = 'test-seed-1';
    const seed2 = 'test-seed-2';
    const generator1 = new ColorGenerator(seed1);
    const generator2 = new ColorGenerator(seed2);

    const color1 = generator1.createColor();
    const color2 = generator2.createColor();

    expect(color1).not.toBe(color2);
  });
});
