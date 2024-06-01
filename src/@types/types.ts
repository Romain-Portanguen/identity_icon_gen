export interface IconOpts {
  backgroundColor?: string;
  color?: string;
  seed?: string;
  size: number;
  spotcolor?: string;
}

export interface CanvasOpts extends IconOpts {
  scale: number;
}