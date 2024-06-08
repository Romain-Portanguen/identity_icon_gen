import { IconUtils } from '../icon-utils';
import { ColorGenerator } from '../color-generator';
import { ImageDataGenerator } from '../image-data-generator';
import { CanvasOptions, IconOptions } from '../@types/icon-utils.requirements';
import { RESOLUTION } from '../@types/constants';

jest.mock('../color-generator');
jest.mock('../image-data-generator');

describe('The IconUtils class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('The generateRandomSeed method', () => {
    it('Should generate a random seed of length 16', () => {
      const seed = IconUtils['generateRandomSeed']();
      expect(seed).toHaveLength(16);
      expect(typeof seed).toBe('string');
    });
  });

  describe('The buildOptions method', () => {
    it('Should build options with defaults', () => {
      const mockCreateColor = jest.fn().mockReturnValue('hsl(0, 100%, 50%)');
      (ColorGenerator as jest.Mock).mockImplementation(() => ({
        createColor: mockCreateColor,
      }));

      const opts: IconOptions = { size: 256 };
      const builtOpts = IconUtils.buildOptions(opts);

      expect(builtOpts.size).toBe(RESOLUTION);
      expect(builtOpts.scale).toBe(256 / RESOLUTION);
      expect(builtOpts.color).toBe('hsl(0, 100%, 50%)');
      expect(builtOpts.backgroundColor).toBe('hsl(0, 100%, 50%)');
      expect(builtOpts.spotcolor).toBe('hsl(0, 100%, 50%)');
    });

    it('Should use provided options', () => {
      const opts: IconOptions = {
        size: 256,
        seed: 'test-seed',
        color: 'hsl(120, 100%, 50%)',
        backgroundColor: 'hsl(240, 100%, 50%)',
        spotcolor: 'hsl(360, 100%, 50%)',
      };
      const builtOpts = IconUtils.buildOptions(opts);

      expect(builtOpts.seed).toBe('test-seed');
      expect(builtOpts.color).toBe('hsl(120, 100%, 50%)');
      expect(builtOpts.backgroundColor).toBe('hsl(240, 100%, 50%)');
      expect(builtOpts.spotcolor).toBe('hsl(360, 100%, 50%)');
    });
  });

  describe('The renderIcon method', () => {
    it('Should render an icon on the canvas', () => {
      const opts: CanvasOptions = {
        size: RESOLUTION,
        seed: 'test-seed',
        scale: 4,
        color: 'hsl(120, 100%, 50%)',
        backgroundColor: 'hsl(240, 100%, 50%)',
        spotcolor: 'hsl(360, 100%, 50%)',
      };

      const mockCreateImageData = jest.fn().mockReturnValue([
        1, 0, 1, 0,
        0, 1, 0, 1,
        1, 0, 1, 0,
        0, 1, 0, 1,
      ]);

      (ImageDataGenerator as jest.Mock).mockImplementation(() => ({
        createImageData: mockCreateImageData,
      }));

      const canvas = {
        getContext: jest.fn().mockReturnValue({
          fillStyle: '',
          fillRect: jest.fn(),
        }),
      };
      IconUtils.renderIcon(opts, canvas as unknown as HTMLCanvasElement);

      const ctx = canvas.getContext('2d');
      expect(ctx).not.toBeNull();
      if (ctx) {
        expect(ctx.fillStyle).toBe('hsl(120, 100%, 50%)');
        expect(ctx.fillRect).toHaveBeenCalled();
      }
    });
  });
});
