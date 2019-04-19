import { getColor } from './mock/color';
import { getFontSize } from './mock/font-size';
import { getText } from './mock/text';

export class Text {
  public value: string;
  public fontSize: number;
  public color: string;

  constructor(text?: string, fontSize?: number, color?: string) {
    this.value = text;
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
