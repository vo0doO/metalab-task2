const initCounter = async (args) => {
  if (typeof args === 'undefined') {
    throw new Error('Undefined arguments');
  }
  try {
    const {
      default: jQuery
    } = await import('jquery');
    const $ = jQuery.noConflict();
    const increment = $('.counter__input');
    console.info('Increment', increment);
  } catch (e) {
    throw new Error(`При инициализации кнопок коунтера возникла ошибка: ${e}`);
  }
};

const ready = async () => {
  try {
    document.addEventListener('DOMContentLoaded', () => {
      console.info('DOM loaded');
    });
    return true;
  } catch (e) {
    throw new Error(`DOM not loaded: ${e}`);
  }
};

ready().then(() => {
  initCounter("counter");
});

export {
  ready,
  initCounter
};