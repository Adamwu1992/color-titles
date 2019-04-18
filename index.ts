import './index.css';
import { Text, getRandomText } from './src/Text';
import { Stage } from './src/Stage';

const $el = document.querySelector('#app') as HTMLCanvasElement;

const stage = new Stage(document.body.clientWidth, document.body.clientHeight);

stage.mount($el);

const sum = 10;
let i = 0;
const texts: Text[] = [];
while (i++ < sum) {
  texts.push(getRandomText());
}

stage.batchInsert(texts);
