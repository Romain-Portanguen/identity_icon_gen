export interface XorshiftPRNGProps {
  seed: number[];
  initializeSeed: (seed: string) => void;
  randomize: () => number;
}
