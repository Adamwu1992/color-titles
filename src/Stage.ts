import { Text } from './Text';
import { StageBg } from './StageBg';
import { TextRect } from './TextRect';
import { pick } from './utils';

export type Angle = 0 | 1 | 2 | 3;

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

  private rectList: TextRect[] = [];
  // 上一个文本框
  get lastRect(): TextRect {
    const l = this.rectList.length;
    return this.rectList[l - 1];
  }
  set lastRect(rect: TextRect) {
    this.rectList.push(rect);
  }

  private ctx: CanvasRenderingContext2D;

  private lineOffset: number = 6;

  /**
   * 挂载到canvas节点上
   * @param el 指定的canvas节点
   */
  public mount(bg: StageBg): void {

    this.canvas = bg;
    this.ctx = bg.ctx;

    // 坐标系居中
    const offsetX = this.canvas.W / 2;
    const offsetY = this.canvas.H / 2;
    this.ctx.translate(offsetX, offsetY);
    this.offsetX += offsetX;
    this.offsetY += offsetY;
    console.log('Stage: ', this.canvas);
  }

  /**
   * 插入文本
   * @param text
   * @roll 是否旋转 -1 逆时针；0 不旋转；1 顺时针
   */
  public async insert(text: Text, roll?: -1 | 0 | 1) {
    const { value, fontSize, color } = text;
    if (roll === undefined) {
      roll = pick([-1, 0, 1]);
    }
    this.rotate(roll);
    this.ctx.save();
    this.ctx.font = `${fontSize}px Yahei`;
    this.ctx.fillStyle = color;

    let { width } = this.ctx.measureText(value);
    width = Math.floor(width);
    const height = fontSize;
    const [x, y] = this.nextPosition(width, height);

    // 检查文本所处屏幕位置
    const offsetX = this.canvas.W / 2 - width / 2 - this.offsetX - x;
    const offsetY = this.canvas.H / 2 + height / 2 - this.offsetY - y;
    await this.canvas.transform({ offsetX, offsetY });

    const rect = new TextRect(x, y + this.lineOffset, width, height, this.angle);
    const isOutBounds = this.isOutBounds(rect);
    const isCovered = this.isCoverBefore(rect);
    console.log(`${text.value}: `, rect);
    console.log(`${text.value} is out bound: `, isOutBounds);
    console.log(`${text.value} is covered before: `, isCovered);

    this.ctx.strokeStyle = isOutBounds ? '#ff0000' : '#fff';
    // 矩形框的位置下沉
    this.ctx.strokeRect(x, y - height + this.lineOffset, width, height);

    this.ctx.fillText(value, x, y);

    this.ctx.restore();

    this.lastRect = rect;
  }

  /**
   * 批量插入文本
   * @param textRects 文本列表
   */
  public batchInsert(textRects: Text[]) {
    const stage = this;
    async function walk(i: number = 0) {
      const text = textRects[i];
      await stage.insert(text);
      if (i < textRects.length - 1) {
        setTimeout(walk, 800, i + 1);
      }
    }
    walk();
  }

  /**
   * 检查文本框是否越界
   * @param rect
   */
  private isOutBounds(rect: TextRect) {
    const { x, y, width, height } = rect.convertAngle();
    const boundW = this.canvas.W / 2;
    const boundH = this.canvas.H / 2;
    return x + width > boundW ||
      Math.abs(x) > boundW ||
      y > boundH ||
      Math.abs(y - height) > boundH;
  }

  /**
   * 检查两个文本框是否相互覆盖
   * @param target
   */
  private isCoverBefore(target: TextRect) {
    function isCovered(rectA: TextRect, rectB: TextRect) {
      const a = rectA.convertAngle();
      const b = rectB.convertAngle();
      // max shape: [top, bottom, left, right]
      const maxA = [a.y + a.height, a.y, a.x, a.x + a.width];
      const maxB = [b.y + b.height, b.y, b.x, b.x + b.width];
      return maxA[0] < maxB[1] || maxA[2] > maxB[4];
    }
    return this.rectList.every((r) => !isCovered(r, target));
  }

  /**
   * 旋转坐标系
   * @param direction 1: 顺时针 -1: 逆时针
   */
  private rotate(direction = 1) {
    if (!direction) {
      return;
    }
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
    console.log('Stage coordinate: ', this.offsetX, this.offsetY, this.angle);
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
      return [lastRect.x, lastRect.y + h - this.lineOffset];
    }
    if (this.angle - lastRect.angle === 1 || this.angle - lastRect.angle === -3) {
      // 从0度转到90时
      return [lastRect.y, -1 * (lastRect.x + this.lineOffset)];
    }
    if (lastRect.angle - this.angle === 1  || lastRect.angle - this.angle === -3) {
      // 逆时针转90度
      return [
        -1 * (lastRect.y + w),
        lastRect.x + lastRect.width - this.lineOffset,
      ];
    }
    return [0, 0];
  }
}
