export const texts = [
  '宇宙魔方',
  '斯图加特',
  '恐龙🦖',
  '托尼·斯塔克',
  '小母鸡🐥',
  'Nick Fury',
  'Pepper🌶',
  '克林特·巴顿',
  '弗吉尼亚',
  '猩红女巫',
  '汤姆·希德勒斯顿',
  '埃里克·塞尔维格格',
  '阿斯加德王座',
  '克里斯·海姆斯沃斯',
];

// tslint:disable-next-line:variable-name
let _lastIndex = -1;

export function getText(): string {
  const index = (_lastIndex += 1) % texts.length;
  const list = texts.sort(() => Math.random() - .5);
  return list[index];
}
