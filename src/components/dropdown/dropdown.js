import $, {
  event
} from 'jquery';


class DropDown {

  constructor() {
    this.root = $('.dropdown');
    this.arrowBtn = $('.dropdown__arrow-button');
    this.items = $('.dropdown__items');
    this.input = $('.dropdown__input');
    this._arrowBtnEvents = this._arrowBtnEvents.bind(this);
    this._inputEvents = this._inputEvents.bind(this);
    this._itemsEvents = this._itemsEvents.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._toggleOpened = this._toggleOpened.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  connectedCallback() {
    this._itemsEvents();
    this._inputEvents();
    this._arrowBtnEvents();
  }

  disconnectedCallback() {
    this.arrowBtn.off('click.dropdown.arrowBtn');
    this.arrowBtn.off('toggle.dropdown.arrowBtn');
    this.input.off('click.dropdown.input');
    this.input.off('toggle.dropdown.input');
    this.items.off('toggle.dropdown.items');
  }

  ariaExpandedToggle(elem) {
    let value = elem.attr('aria-expanded');
    switch (value) {
      case 'false':
        elem.attr('aria-expanded', 'true');
        break;
      case 'true':
        elem.attr('aria-expanded', 'false');
        break;
      case 'undefined':
        elem.attr('aria-expanded', 'true');
        break;
      default:
        break;
    }
  }

  _handleClick() {
    const self = this;
    self.items.triggerHandler('toggle.dropdown.items');
    self.input.triggerHandler('toggle.dropdown.input');
    self.arrowBtn.triggerHandler('toggle.dropdown.arrowBtn');
  }

  _handleKeyPress(event) {
    event.preventDefault();
    const self = this;
    let elem = $(event.target);
    let key = event.which;
    switch (key) {
      case 32:
        self.items.trigger('toggle.dropdown.items');
        self.input.trigger('toggle.dropdown.input');
        self.arrowBtn.trigger('toggle.dropdown.arrowBtn');
        break;
      default:
        break;
    }
  }

  _toggleOpened(event) {
    let elem = $(event.target);
    let KJIACC = elem.attr('class').split(' ')[0];
    switch (KJIACC) {
      case 'dropdown__items':
        elem.toggleClass('dropdown__items_opened');
        break;
      case 'dropdown__input':
        elem.toggleClass('dropdown__input_opened');
        this.ariaExpandedToggle(elem);
        break;
      case 'dropdown__arrow-button':
        elem.toggleClass('dropdown__arrow-button_opened');
        break;
      default:
        break;
    }
  }

  _itemsEvents() {
    this.items.on({
      'toggle.dropdown.items': this._toggleOpened
    });
  }

  _inputEvents() {
    const self = this;
    self.input.on({
      'click.dropdown.input': self._handleClick,
      'toggle.dropdown.input': self._toggleOpened,
      'keypress': self._handleKeyPress
    });
  }

  _arrowBtnEvents() {
    this.arrowBtn.on({
      'click.dropdown.arrowBtn': this._handleClick,
      'toggle.dropdown.arrowBtn': this._toggleOpened
    });
  }
}

const ready = async () => {
  try {
    document.addEventListener('DOMContentLoaded', () => {
      const dropdown = new DropDown();
      dropdown.connectedCallback();
      console.clear();
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