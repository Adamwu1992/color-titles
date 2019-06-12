import { deley } from "./utils";

export interface ITransform {
  offsetX?: number;
  offsetY?: number;
  rotate?: number;
  scale?: number;
}

export class StageBg {
  public $canvas: HTMLCanvasElement;
  public W: number;
  public H: number;
  public ctx: CanvasRenderingContext2D;

  private offsetX: number = 0;
  private offsetY: number = 0;
  private rotate: number = 0;
  private scale: number = 1;

  constructor(el: HTMLCanvasElement, width: number, height: number) {

    console.log('init', width, height);

    el.setAttribute('width', `${width}px`);
    el.setAttribute('height', `${height}px`);

    this.$canvas = el;
    this.W = width;
    this.H = height;

    this.ctx = el.getContext('2d');

    this.registDrag();

  }

  public async transform(t: ITransform, cancelAnimate = false) {
    const {
      offsetX = this.offsetX,
      offsetY = this.offsetY,
      rotate = this.rotate,
      scale = this.scale,
    } = t;
    let style = `transform: translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg) scale(${scale})`;
    if (cancelAnimate) {
      style += ';transition: none';
    }
    this.$canvas.setAttribute('style', style);

    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scale = scale;
    this.rotate = rotate;
    await deley(1000);
  }

  private registDrag(): void {

    let anchorX = 0;
    let anchorY = 0;

    const onMouseDown = (evt: MouseEvent) => {
      console.log('handle mouse down', evt);
      this.$canvas.addEventListener('mousemove', onMouseMove);
      const { x, y } = evt;
      anchorX = x;
      anchorY = y;
    };
    const onMouseMove = (evt: MouseEvent) => {
      console.log('handle mouse move', evt);
      const { x, y } = evt;
      const offsetX = x - anchorX;
      const offsetY = y - anchorY;
      anchorX = x;
      anchorY = y;
      this.transform({ offsetX: this.offsetX + offsetX, offsetY: this.offsetY + offsetY }, true);
      // TODO:: 修改鼠标样式
    };
    const onMouseUp = (evt: MouseEvent) => {
      console.log('handle mouse up', evt);
      this.$canvas.removeEventListener('mousemove', onMouseMove);
      anchorX = 0;
      anchorY = 0;
    };

    this.$canvas.addEventListener('mousedown', onMouseDown);
    this.$canvas.addEventListener('mouseup', onMouseUp);
  }
}
