
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
  }

  public transform(t: ITransform) {
    const {
      offsetX = this.offsetX,
      offsetY = this.offsetY,
      rotate = this.rotate,
      scale = this.scale,
    } = t;
    const style = `transform: translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg) scale(${scale})`;
    this.$canvas.setAttribute('style', style);

    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.scale = scale;
    this.rotate = rotate;
  }

}
