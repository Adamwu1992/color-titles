export type Color = string;

export const warm: Array<Color> = [
  '#ff1744',
  '#f44336',
  '#e57373',
  '#aeea00',
  '#ef6c00',
  '#ffab00',
  '#ff9e80',
  '#9e9d24',
  '#ffb74d',
  '#fff59d'
];
export const cold: Array<Color> = [
  '#90a4ae',
  '#a1887f',
  '#e0e0e0',
  '#4caf50',
  '#00e676',
  '#76ff03',
  '#1b5e20',
  '#33691e',
  '#01579b',
  '#1de9b6'
];

let _index = 0;

export function getColor(): Color {
  const collection = (_index++) % 2 === 0 ? cold : warm;
  const index = Math.floor(Math.random() * 10);
  return collection[index];
}