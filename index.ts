import './index.css';
import { getColor } from './src/color';
import { getFontSize } from './src/font-size';
import { getText } from './src/text';
import { random, deley } from './src/utils';

const $canvas: HTMLCanvasElement = document.querySelector('#app');

let ctx: CanvasRenderingContext2D;


function beforeLaunch() {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  $canvas.setAttribute('width', `${width}`);
  $canvas.setAttribute('height', `${height}`);

  try {
    ctx = $canvas.getContext('2d');
  } catch (e) {}

  ctx.translate(width / 2, height /2);
}

beforeLaunch();

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: Rotate
}

let lastRect = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rotate: 0
};

/**
 * Rotate
 * - 0 旋转0du
 * - 1 顺时针旋转90deg
 * - 2 顺时针旋转180deg
 * - 3 顺时针旋转270deg
 */
type Rotate = 0 | 1 | 2 | 3;

let currentRotate = 0;

type Point = {
  x: number;
  y: number;
}

/**
 * getPosition 获取传入矩形的布局位置
 * @param w 矩形的宽
 * @param h 矩形的高
 */
function getPosition(w: number, h: number): Point {

  const { rotate } = lastRect;
  if (rotate === currentRotate) {
    return {
      x: lastRect.x,
      y: lastRect.y + h
    }
  } else if (currentRotate - rotate === 1 || currentRotate - rotate === -3) {
    // 从0度转到90时
    // 原来矩形的y坐标是新矩形的x坐标，+10边距
    // 原来矩形的x坐标和新矩形的y坐标根据原y轴对称
    return {
      x: lastRect.y + 10,
      y: -1 * lastRect.x
    }
  } else if (rotate - currentRotate === 1  || rotate - currentRotate === -3) {
    return {
      x: -1 * (lastRect.y + w),
      y: lastRect.x + lastRect.width
    }
  }
  throw new Error(`rotate: ${rotate}, currentRotate: ${currentRotate}`);

}

function insertWord() {
  const h = getFontSize();
  const font = `${h}px Yahei`;
  const fillStyle = getColor();
  const text = getText();

  ctx.save();
  ctx.font = font;
  ctx.fillStyle = fillStyle;

  const { width } = ctx.measureText(text);
  const height = h;

  const { x, y } = getPosition(width, height);


  
  ctx.fillText(text, x, y);
  ctx.restore()

  lastRect = {
    x,
    y,
    width: width,
    height: height,
    rotate: currentRotate
  }

  console.log(text, lastRect, text);
}

function rotate(): Promise<void> {
  if (currentRotate === 3) {
    decreaseRotate();
  } else if (currentRotate === 0) {
    increaseRotate();
  } else {
    const r = random() ? increaseRotate : decreaseRotate;
    r();
  }
  // const deg = currentRotate * -90
  // $canvas.setAttribute('style', `transform: rotate(${deg}deg)`);
  return deley();
}

/**
 * 顺时针转动坐标轴90度
 */
function increaseRotate() {
  ctx.rotate(Math.PI * .5);
  currentRotate = (currentRotate + 1) % 4;
  console.log('current totate', currentRotate);
}

/**
 * 逆时针转动坐标轴90度
 */
function decreaseRotate() {
  ctx.rotate(Math.PI * -.5);
  currentRotate = (currentRotate + 3) % 4;
  console.log('current totate', currentRotate);
}

function run(): void {
  let times = 15;
  
  const step = async () => {
    if (random(.3)) {
      await rotate();
      insertWord();
    } else {
      insertWord();
    }

    if (--times > 0) {
      setTimeout(step, 1500);
    }
  }

  step();
}

run();

