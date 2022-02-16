import $ from 'jquery';

class DropDown extends HTMLElement {
	static get classes() {
		return {
			ROOT: 'js-dropdown',
			INPUT: 'js-dropdown__input',
			ITEMS: 'js-dropdown__items',
			ROOT_OPENED: 'js-dropdown',
			ARROW_BUTTON: 'js-dropdown__arrow-button',
			CLEAR_BUTTON: 'js-dropdown__clear-button',
			INPUT_OPENED: 'js-dropdown__input_opened',
			ITEMS_OPENED: 'js-dropdown__items_opened',
			CONFIRM_BUTTON: 'js-dropdown__confirm-button',
			ARROW_BUTTON_OPENED: 'js-dropdown__arrow-button_opened',
			CLEAR_BUTTON_OPENED: 'js-dropdown__clear-button_opened',
			CONFIRM_BUTTON_OPENED: 'js-dropdown__confirm-button_opened',
		};
	}

	static get events() {
		return {
			CLICK_INPUT: 'click.dropdown.input',
			CHANGE_ROOT_VALUE: 'change.dropdown.root.value',
			CHANGE_INPUT_VALUE: 'change.dropdown.input.value',
			CLICK_ARROW_BUTTON: 'click.dropdown.arrow-button',
			CLICK_CLEAR_BUTTON: 'click.dropdown.clear-button',
			TOGGLE_ROOT_OPENED: 'toggle.dropdown.root.opened',
			TOGGLE_ITEMS_OPENED: 'toggle.dropdown.items.opened',
			TOGGLE_INPUT_OPENED: 'toggle.dropdown.input.opened',
			CHANGE_ROOT_DATA_VALUE: 'change.dropdown.root.value',
			CLICK_CONFIRM_BUTTON: 'click.dropdown.confirm-button',
			CHANGE_ROOT_PLACEHOLDER: 'change.dropdown.root.placeholder',
			CHANGE_INPUT_PLACEHOLDER: 'change.dropdown.root.placeholder',
			TOGGLE_ARROW_BUTTON_OPENED: 'toggle.dropdown.arrowBtn.opened',
			TOGGLE_CLEAR_BUTTON_OPENED: 'toggle.dropdown.clear-button.opened',
			TOGGLE_CONFIRM_BUTTON_OPENED: 'toggle.dropdown.confirm-button.opened',
		};
	}

	static get observedAttributes() {
		return ['value', 'class', 'aria-expanded', 'placeholder', 'data-values'];
	}

	constructor() {
		super();
		this.root = $('.js-dropdown');
		this.items = $('.js-dropdown__items');
		this.input = $('.js-dropdown__input');
		this.arrowBtn = $('.js-dropdown__arrow-button');
		this.inputEvents = this.inputEvents.bind(this);
		this.itemsEvents = this.itemsEvents.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.toggleOpened = this.toggleOpened.bind(this);
		this.arrowBtnEvents = this.arrowBtnEvents.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	connectedCallback() {
		this.itemsEvents();
		this.inputEvents();
		this.arrowBtnEvents();
	}

	disconnectedCallback() {
		this.input.off('click.dropdown.input');
		this.input.off('toggle.dropdown.input.opened');
		this.items.off('toggle.dropdown.items.opened');
		this.arrowBtn.off('click.dropdown.arrowBtn');
		this.arrowBtn.off('toggle.dropdown.arrowBtn.opened');
	}

	ariaExpandedToggle(elem) {
		const value = elem.attr('aria-expanded');
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

	handleClick() {
		this.items.triggerHandler('toggle.dropdown.items.opened');
		this.input.triggerHandler('toggle.dropdown.input.opened');
		this.arrowBtn.triggerHandler('toggle.dropdown.arrowBtn.opened');
	}

	handleKeyPress(event) {
		event.preventDefault();

		const key = event.which;
		switch (key) {
			case 32:
				this.items.trigger('toggle.dropdown.items.opened');
				this.input.trigger('toggle.dropdown.input.opened');
				this.arrowBtn.trigger('toggle.dropdown.arrowBtn.opened');
				break;
			default:
				break;
		}
	}

	toggleOpened(event) {
		const elem = $(event.target);
		const cls = elem.attr('class').split(' ')[0];
		switch (cls) {
			case 'js-dropdown__items':
				elem.toggleClass('js-dropdown__items_opened');
				break;
			case 'js-dropdown__input':
				elem.toggleClass('js-dropdown__input_opened');
				this.ariaExpandedToggle(elem);
				break;
			case 'js-dropdown__arrow-button':
				elem.toggleClass('js-dropdown__arrow-button_opened');
				break;
			default:
				break;
		}
	}

	itemsEvents() {
		this.items.on({
			'toggle.dropdown.items.opened': this.toggleOpened
		});
	}

	inputEvents() {
		this.input.on({
			keypress: this.handleKeyPress,
			'click.dropdown.input': this.handleClick,
			'toggle.dropdown.input.opened': this.toggleOpened,
		});
	}

	arrowBtnEvents() {
		this.arrowBtn.on({
			'click.dropdown.arrowBtn': this.handleClick,
			'toggle.dropdown.arrowBtn.opened': this.toggleOpened
		});
	}
}

window.customElements.define('drop-down', DropDown);
