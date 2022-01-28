import $ from 'jquery';
import { log, setLogLevel } from 'webpack-dev-server/client/utils/log';

setLogLevel('verbose');

const initCounter = async (args) => {
  if (typeof args === 'undefined') {
    throw new Error('Undefined arguments');
  }
  try {
    const increment = $('.counter__input');
    log('Increment', increment);
  } catch (e) {
    log('При инициализации кнопок коунтера возникла ошибка: ', e);
    throw new Error(e);
  }
};

const ready = async () => {
  try {
    document.addEventListener('DOMContentLoaded', (e) => {
      log('DOM loaded: ', e);
    });
    return true;
  } catch (e) {
    throw new Error(`DOM not loaded: ${e}`);
  }
};

initCounter(ready()).then((r) => { log(r); });
