import $, {
  event
} from 'jquery';


class DropDown {

  constructor() {
    this.root = $('.dropdown');
    this.arrowBtn = $('.dropdown__arrow-button');
    this.items = $('.dropdown__items');
    this.input = $('.dropdown__input');
    this.showHideItems = () => {
      this.items.trigger('dropdown:toggle');
      this.input.trigger('dropdown:toggle');
      this.arrowBtn.trigger('dropdown:toggle');
    };
  }

  get showHide() {
    return this.showHideItems;
  }

  ariaExpandedToggle(elem) {
    if (elem.attr('aria-expanded') === 'false') {
      elem.attr('aria-expanded', 'true');
    } else if (elem.attr('aria-expanded') === 'true') {
      elem.attr('aria-expanded', 'false');
    }
  }

  itemsEvents() {
    this.items.on({
      'dropdown:toggle': function (event) {
        var elem = $(this);
        elem.toggleClass('dropdown__items_closed');
      }
    });
  }

  inputEvents() {
    const ctx = this;
    ctx.input.on({
      'click': ctx.showHide,
      'dropdown:toggle': function (event) {
        var elem = $(this);
        elem.toggleClass('dropdown__input_opened');
        ctx.ariaExpandedToggle(elem);
      },
      'keyup': function (event) {
        if (event.which === 32) {
          ctx.items.trigger('dropdown:toggle');
          ctx.input.trigger('dropdown:toggle');
          ctx.arrowBtn.trigger('dropdown:toggle');
        }
      }
    });
  }

  arrowBtnEvents() {
    this.arrowBtn.on({
      'click': this.showHide,
      'dropdown:toggle': function (event) {
        var elem = $(this);
        elem.toggleClass('dropdown__arrow-button_opened');
      }
    });
  }

  init() {
    console.log("DropDown init");
    this.itemsEvents();
    this.inputEvents();
    this.arrowBtnEvents();
  }
}

const ready = async () => {
  try {
    document.addEventListener('DOMContentLoaded', () => {
      console.info('DOM loaded');
      const dropdown = new DropDown();
      dropdown.init();
    });
    return true;
  } catch (e) {
    throw new Error(`DOM not loaded: ${e}`);
  }
};


ready();

export {
  DropDown
};