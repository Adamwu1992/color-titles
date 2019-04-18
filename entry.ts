import './index.css';
import { getColor } from './src/color';
import { getFontSize } from './src/font-size';
import { getText } from './src/Text';
import { random, deley } from './src/utils';
import { Stage } from './src/Stage';

const $el = document.querySelector('#app') as HTMLCanvasElement;

const stage = new Stage(document.body.clientWidth, document.body.clientHeight);

stage.mount($el);

stage.insert(getText(), getFontSize(), getColor());
stage.insert(getText(), getFontSize(), getColor());
stage.insert(getText(), getFontSize(), getColor());
