import './index.css';
import { getColor } from './src/color';
import { getFontSize } from './src/font-size';
import { getText } from './src/Text';
import { Stage } from './src/Stage';
import { Text } from './src/Text';

const $el = document.querySelector('#app') as HTMLCanvasElement;

const stage = new Stage(document.body.clientWidth, document.body.clientHeight);

stage.mount($el);

const sum = 10;
let i = 0;
const texts: Text[] = [];
while (i++ < sum) {
  texts.push(new Text(getText(), getFontSize(), getColor()));
}

stage.bashInsert(texts);
