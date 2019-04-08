const $canvas = document.querySelector('#app');

let ctx;
try {
  ctx = $canvas.getContext('2d');
} catch (e) {}

function beforeLaunch() {
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;
  $canvas.setAttribute('width', `${width}`);
  $canvas.setAttribute('height', `${height}`);
}

beforeLaunch();

const texts = [
  'hello world',
  '绘制的最大宽度是可选的',
  '展示了textBaseline'
]

ctx.font = '40px Yahei';
ctx.fillStyle = '#ff6d00';
ctx.fillText(texts[0], 300, 400);

ctx.font = '50px Yahei';
ctx.fillStyle = '#2e7d32';
ctx.fillText(texts[1], 300, 450);

ctx.rotate(Math.PI * .5);

ctx.font = '45px Yahei';
ctx.fillStyle = '#00b0ff';
ctx.fillText(texts[2], 460, -300);

ctx.font = '35px Yahei';
ctx.fillStyle = '#c6ff00';
ctx.fillText(texts[0], 460, -265);

ctx.rotate(Math.PI * .5);

ctx.font = '40px Yahei';
ctx.fillStyle = '#8d6e63';
const w = ctx.measureText(texts[1]);
console.log(w);
ctx.fillText(texts[1], -w.width, -200);

