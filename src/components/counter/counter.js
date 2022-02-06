import $ from 'jquery';

class Counter {
  constructor() {
    this.input = $('.counter__input_spy');
    this.increment = $('.counter__increment');
    this.decrement = $('.counter__decrement');
    this.observer = new MutationObserver(this.observerCallback);
    this._incrementsEvents = this._incrementsEvents.bind(this);
    this._decrementsEvents = this._decrementsEvents.bind(this);
  }

  init() {
    this._decrementsEvents();
    this._incrementsEvents();
    this.observe();
  }

  observerCallback(mutationsList, observer) {
    console.log(mutationsList);
    console.log(observer);
  }

  observe() {
    Array.map(this.input.get(), (node) => {
      this.observer.observe(node, this.observerConfig);
    });
  }

  getDisabled(item) {
    return $(item).attr('disabled');
  }

  setDisabled(item) {
    let disabled = this.getDisabled(item);
    if (disabled === 'disabled') {
      $(item).removeAttr('disabled');
    } else {
      $(item).attr('disabled', '');
    }
  }

  get observerConfig() {
    return {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true
    };
  }

  _onOfBtn(elem, input) {
    input = $(input);
    const max = parseInt(input.attr('max'));
    const min = parseInt(input.attr('min'));
    const val = parseInt(input.val());
    console.log(val, min, max);
    if (val < max) {
      if (elem.hasClass('counter__increment_disabled')) {
        elem.removeClass('counter__increment_disabled');
      }
    }
    if (val >= max) {
      if (!elem.hasClass('counter__increment_disabled')) {
        elem.addClass('counter__increment_disabled');
      }
    }
    if (val > min) {
      if (elem.hasClass('counter__decrement_disabled')) {
        elem.removeClass('counter__decrement_disabled');
      }
    }
    if (val <= min) {
      if (!elem.hasClass('counter__decrement_disabled')) {
        elem.addClass('counter__decrement_disabled');
      }
    }
  }

  _incrementsEvents() {
    const self = this;
    self.increment.each(function () {
      var elem = $(this);
      var input = elem.prev().get()[0];
      elem.on({
        'click': function (event) {
          input.stepUp();
          $(input).attr('value', input.value);
        }
      });
    });
  }

  _decrementsEvents() {
    const self = this;
    self.decrement.each(function () {
      var elem = $(this);
      var input = elem.next().get()[0];
      elem.on({
        'click': function (event) {
          input.stepDown();
          $(input).attr('value', input.value);
        }
      });
    });
  }
}

const ready = async () => {
  try {
    document.addEventListener('DOMContentLoaded', () => {
      const counter = new Counter();
      counter.init();
      console.info('Counter init');

      // var targetNodes = document.querySelectorAll('.counter__input_spy');

      // const config = {
      //   subtree: true,
      //   childList: true,
      //   characterData: true,
      //   attributes: true,
      // };

      // const callback = function (mutationsList, observer) {
      //   console.log(mutationsList);
      //   console.log(observer);
      // };

      // const observerInput = new MutationObserver(callback);
      // Array.map(targetNodes, (node) => {
      //   observerInput.observe(node, config);
      // });
    });
  } catch (e) {
    throw new Error(`DOM not loaded: ${e}`);
  }
};

ready();




export {
  Counter
};