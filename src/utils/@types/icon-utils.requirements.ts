export interface IconUtilsProps {
  buildOptions(opts: IconOptions): CanvasOptions;
  renderIcon(opts: CanvasOptions, canvas: HTMLCanvasElement): HTMLCanvasElement;
}

export interface IconOptions {
  size: number;
  seed?: string;
  color?: string;
  backgroundColor?: string;
  spotcolor?: string;
}

export interface CanvasOptions extends IconOptions {
  scale: number;
  seed: string;
  color: string;
  backgroundColor: string;
  spotcolor: string;
}
