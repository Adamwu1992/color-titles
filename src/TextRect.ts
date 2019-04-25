import { Angle } from './Stage';

export class TextRect {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public angle: Angle;

  constructor(x: number, y: number, width: number, height: number, angle: Angle = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = angle;
  }

  /**
   * 将当前矩形转化到初始坐标系中
   */
  public convertAngle(): TextRect {
    if (this.angle === 0) {
      return this;
    }
    const { x, y, width, height } = this;
    if (this.angle === 1) {
      return new TextRect(-y, x + width, height, width);
    } else if (this.angle === 2) {
      return new TextRect(-(x + width), -(y - height), width, height);
    } else {
      return new TextRect(y - height, -x, height, width);
    }
  }
}
