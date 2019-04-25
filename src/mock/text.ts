export const texts = [
  '宇宙魔方',
  '斯图加特',
  '恐龙🦖',
  '托尼·斯塔克',
  '小母鸡🐥',
  'Nick Fury',
  'Pepper🌶',
  '篮球',
  '弗吉尼亚',
  '猩红女巫',
  '德州理工',
  '堪萨斯',
  '阿斯加德王座',
  '北卡罗来纳',
];

// tslint:disable-next-line:variable-name
let _lastIndex = -1;

export function getText(): string {
  const index = (_lastIndex += 1) % texts.length;
  const list = texts.sort(() => Math.random() - .5);
  return list[index];
}
