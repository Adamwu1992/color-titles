import { getColor } from './color';
import { getFontSize } from './font-size';

export const texts = [
  '黄石',
  'maintain',
  '恐龙🦖',
  'movement',
  '小母鸡🐥',
  '🦖dinosaur',
  '🐥pullet',
  '篮球',
  '弗吉尼亚',
  '鸡肉挺嫩滑',
  '德州理工',
  '堪萨斯',
  '拿来煮汤',
  '北卡罗来纳',
  'Duke Wisdom',
  '火箭🚀',
];

// tslint:disable-next-line:variable-name
let _lastIndex = -1;

export function getText(): string {
  const index = (_lastIndex += 1) % texts.length;
  const list = texts.sort(() => Math.random() - .5);
  return list[index];
}

export class Text {
  public text: string;
  public fontSize: number;
  public color: string;

  constructor(text?: string, fontSize?: number, color?: string) {
    this.text = text;
    this.fontSize = fontSize;
    this.color = color;
  }
}

export function getRandomText() {
  return new Text(
    getText(),
    getFontSize(),
    getColor(),
  );
}
