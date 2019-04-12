export type Angle = 0 | 1 | 2 | 3;

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  angle: Angle;
};

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

  // 上一个文本框
  private lastRect: Rect;

  private $canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public mount(el: HTMLCanvasElement): void {
    this.$canvas = el;

    this.$canvas.setAttribute("width", `${this.width}`);
    this.$canvas.setAttribute("height", `${this.height}`);

    this.ctx = this.$canvas.getContext("2d");

    // 坐标系居中
    this.translate(this.width / 2, this.height / 2);
  }

  public translate(offsetX: number, offsetY: number) {
    this.ctx.translate(offsetX, offsetY);
    this.offsetX += offsetX;
    this.offsetY += offsetY;
  }

  /**
   * 顺时针旋转90度
   */
  increaseRotate() {
    this.ctx.rotate(Math.PI * .5);
    const currentAngle = <number>this.angle;
    this.angle = <Angle>((currentAngle + 1) % 4);
  }

  /**
   * 逆时针旋转90度
   */
  decreaseRotate() {
    this.ctx.rotate(Math.PI * -.5);
    const currentAngle = <number>this.angle;
    this.angle = <Angle>((currentAngle + 3) % 4);
  }

  private nextPosition(): Position {
    return [0, 0];
  }

  insert(text: string, fontSize: number, color: string) {
    // TODO:
  }
}
