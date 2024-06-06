import { ImageDataGenerator } from './image-data-generator';

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

describe('The ImageDataGenerator class', () => {
  it('Should create symmetrical image data', () => {
    const seed = 'test-seed-1';
    const generator = new ImageDataGenerator(seed);

    const data = generator.createImageData(4);

    const expectedData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    expect(data).toEqual(expectedData);
  });

  it('Should create different image data for different seeds', () => {
    const seed1 = 'test-seed-1';
    const seed2 = 'test-seed-2';
    const generator1 = new ImageDataGenerator(seed1);
    const generator2 = new ImageDataGenerator(seed2);

    const data1 = generator1.createImageData(4);
    const data2 = generator2.createImageData(4);

    expect(data1).not.toEqual(data2);
  });

  it('Should create correct mirrored rows', () => {
    const seed = 'test-seed-1';
    const generator = new ImageDataGenerator(seed);

    const data = generator.createImageData(4);

    const expectedData = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    expect(data).toEqual(expectedData);
  });
});

