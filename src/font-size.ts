export type FontSize = string;

const steps: Array<number> = [5, 10, 15];

let last: number = 40;

export function getFontSize(): FontSize {
  const op = Math.random() > .5 ? 1 : -1;
  const index = Math.floor(Math.random() * 3);
  const step = steps[index];
  const fontSize = last + op * step;
  last = fontSize;
  return `${fontSize}px`;
}