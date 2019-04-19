import { Text } from './Text';
import { StageBg } from './StageBg';
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

  // 坐标轴偏移
  public offsetX = 0;
  public offsetY = 0;

  // 坐标旋转角度
  public angle: Angle = 0;
  // 画布旋转角度
  public canvasAngle: number = 0;

  private canvas: StageBg;

  private rectList: IRect[] = [];
  // 上一个文本框
  get lastRect(): IRect {
    const l = this.rectList.length;
    return this.rectList[l - 1];
  }
  set lastRect(rect: IRect) {
    this.rectList.push(rect);
  }

  private ctx: CanvasRenderingContext2D;

  /**
   * 挂载到canvas节点上
   * @param el 指定的canvas节点
   */
  public mount(bg: StageBg): void {

    this.canvas = bg;
    this.ctx = bg.ctx;

    // 坐标系居中
    this.translate(this.canvas.W / 2, this.canvas.H / 2);
    console.log('Stage: ', this.canvas);
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
    console.log('Stage coordinate: ', this.offsetX, this.offsetX, this.angle);
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
    this.canvas.transform({ rotate: this.canvasAngle });
    console.log('Stage coordinate: ', this.offsetX, this.offsetX, this.angle);
  }

  /**
   * 插入文本
   * @param text
   */
  public insert(text: Text) {
    const { value, fontSize, color } = text;
    this.ctx.save();
    this.ctx.font = `${fontSize}px Yahei`;
    this.ctx.fillStyle = color;

    let { width } = this.ctx.measureText(value);
    width = Math.floor(width);
    const height = fontSize;
    const [x, y] = this.nextPosition(width, height);

    this.ctx.strokeStyle = '#fff';
    this.ctx.strokeRect(x, y - height + 5, width, height);

    this.ctx.fillText(value, x, y);

    this.ctx.restore();

    // 检查文本所处屏幕位置
    const offsetX = this.canvas.W / 2 - width / 2 - this.offsetX - x;
    const offsetY = this.canvas.H / 2 + height / 2 - this.offsetY - y;
    this.canvas.transform({ offsetX, offsetY });

    this.lastRect = { x, y: y + 5, width, height, angle: this.angle };
    console.log('inserted', this.lastRect);
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
      stage.insert(text);
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
    const lastRect = this.lastRect || {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      angle: 0,
    };
    if (lastRect.angle === this.angle) {
      return [lastRect.x, lastRect.y + h];
    }
    if (this.angle - lastRect.angle === 1 || this.angle - lastRect.angle === -3) {
      // 从0度转到90时
      return [lastRect.y, -1 * lastRect.x];
    }
    if (lastRect.angle - this.angle === 1  || lastRect.angle - this.angle === -3) {
      // 逆时针转90度
      return [
        -1 * (lastRect.y + w),
        lastRect.x + lastRect.width,
      ];
    }
    return [0, 0];
  }
}
