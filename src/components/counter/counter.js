import jQuery from 'jquery';

const $ = jQuery.noConflict();

const initCounter = async (args) => {
  if (typeof args === 'undefined') {
    console.error(new Error('Undefined arguments'));
  }
  try {
    const increment = $('.counter__input');
    console.info('Increment', increment);
  } catch (e) {
    console.error(new Error(`При инициализации кнопок коунтера возникла ошибка: ${e}`));
    throw new Error(e);
  }
};

const ready = async () => {
  try {
    document.addEventListener('DOMContentLoaded', () => {
      console.info('DOM loaded');
      console.info('im here');
    });
    return true;
  } catch (e) {
    throw new Error(`DOM not loaded: ${e}`);
  }
};

ready();
initCounter("counter");
console.info('im here - file');
export { ready, initCounter };
