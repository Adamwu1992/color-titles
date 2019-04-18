import { Text } from './Text';
import { random, deley } from './utils';

export type Angle = 0 | 1 | 2 | 3;

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: Angle;
}

export type Position = [number, number];

export class Stage {

  // 画布尺寸
  public width: number;
  public height: number;
  // 坐标轴偏移
  public offsetX = 0;
  public offsetY = 0;
  // 坐标旋转角度
  public angle: Angle = 0;
  // 画布旋转角度
  public canvasAngle: number = 0;

  // 上一个文本框
  private lastRect: IRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    angle: this.angle,
  };

  private $canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  /**
   * 挂载到canvas节点上
   * @param el 指定的canvas节点
   */
  public mount(el: HTMLCanvasElement): void {
    this.$canvas = el;

    this.$canvas.setAttribute("width", `${this.width}`);
    this.$canvas.setAttribute("height", `${this.height}`);

    this.ctx = this.$canvas.getContext("2d");

    // 坐标系居中
    this.translate(this.width / 2, this.height / 2);
  }

  /**
   * 移动坐标系
   * @param offsetX X偏移
   * @param offsetY Y偏移
   */
  public translate(offsetX: number, offsetY: number) {
    this.ctx.translate(offsetX, offsetY);
    this.offsetX += offsetX;
    this.offsetY += offsetY;
  }

  /**
   * 旋转坐标系
   * @param direction 1: 顺时针 -1: 逆时针
   */
  public rotate(direction = 1) {
    const deg = Math.PI * direction * .5;
    this.ctx.rotate(deg);
    const currentAngle = this.angle as number;
    this.angle = ((currentAngle + direction + 4) % 4) as Angle;

    if (direction > 0) {
      this.canvasAngle -= 90;
    } else {
      this.canvasAngle += 90;
    }
    this.$canvas.setAttribute('style', `transform: rotate(${this.canvasAngle}deg)`);
  }

  /**
   * 插入文本
   * @param text 文本内容
   * @param fontSize 字体大小
   * @param color 字体颜色
   */
  public insert(text: string, fontSize: number, color: string) {
    this.ctx.save();
    this.ctx.font = `${fontSize}px Yahei`;
    this.ctx.fillStyle = color;

    const { width } = this.ctx.measureText(text);
    const height = fontSize;
    const [x, y] = this.nextPosition(width, height);

    this.ctx.fillText(text, x, y);

    this.lastRect = { x, y, width, height, angle: this.angle };
  }

  /**
   * 批量插入文本
   * @param textRects 文本列表
   */
  public batchInsert(textRects: Text[]) {
    const stage = this;
    async function walk(i: number = 0) {
      await doRotate();
      const text = textRects[i];
      stage.insert(text.text, text.fontSize, text.color);
      if (i < textRects.length - 1) {
        setTimeout(walk, 800, i + 1);
      }
    }

    async function doRotate() {
      if (random()) {
        const d = random() ? 1 : -1;
        stage.rotate(d);
        await deley(800);
      }
    }

    walk();

  }

  /**
   * 下一个文本框的位置
   * @param w 下一个文本框的宽度
   * @param h 下一个文本框的高度
   */
  private nextPosition(w: number, h: number): Position {
    const { angle } = this.lastRect;
    if (angle === this.angle) {
      return [
        this.lastRect.x,
        this.lastRect.y + h,
      ];
    }
    if (this.angle - angle === 1 || this.angle - angle === -3) {
      // 从0度转到90时
      // 原来矩形的y坐标是新矩形的x坐标，+10边距
      // 原来矩形的x坐标和新矩形的y坐标根据原y轴对称
      return [
        this.lastRect.y + 10,
        -1 * this.lastRect.x,
      ];
    }
    if (angle - this.angle === 1  || angle - this.angle === -3) {
      return [
        -1 * (this.lastRect.y + w),
        this.lastRect.x + this.lastRect.width,
      ];
    }
    return [0, 0];
  }
}
