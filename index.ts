import './index.css';
import { Text, getRandomText } from './src/Text';
import { Stage } from './src/Stage';
import { StageBg } from './src/StageBg';

const $el = document.querySelector('#app') as HTMLCanvasElement;

const bg = new StageBg($el, document.body.clientWidth, document.body.clientHeight);

const stage = new Stage();

stage.mount(bg);

const sum = 5;
let i = 0;
const texts: Text[] = [];
while (i++ < sum) {
  texts.push(getRandomText());
}

stage.batchInsert(texts);

// stage.rotate();
// stage.insert(getRandomText());
// stage.rotate();
// stage.insert(getRandomText());
// stage.insert(getRandomText());
// stage.insert(getRandomText());
// stage.insert(getRandomText());
// stage.insert(getRandomText());
// stage.insert(getRandomText());
// stage.insert(getRandomText());
// stage.insert(getRandomText());
// stage.insert(getRandomText());
