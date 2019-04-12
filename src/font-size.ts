export type FontSize = number;

const steps: FontSize[] = [5, 10, 15];

let last = 40;
let op = Math.random() > .5 ? 1 : -1;

export function getFontSize(): FontSize {
  op *= -1;
  const index = Math.floor(Math.random() * 3);
  const step = steps[index];
  const fontSize = last + op * step;
  last = fontSize;
  return fontSize;
}
