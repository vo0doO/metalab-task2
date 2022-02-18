import $ from 'jquery';
import { IconButton } from '../button/button';
import.meta.webpackHot.accept(
	'./../../index.js'
	);
class DropDown extends HTMLElement {
	static get classes() {
		return {
			ROOT: 'js-dropdown',
			INPUT: 'js-dropdown__input',
			ITEMS: 'js-dropdown__items',
			ROOT_OPENED: 'js-dropdown',
			INPUT_OPENED: 'js-dropdown__input_opened',
			ITEMS_OPENED: 'js-dropdown__items_opened',
		};
	}

	static get events() {
		return {
			CLICK_INPUT: 'click.dropdown.input',
			CHANGE_ROOT_VALUE: 'change.dropdown.root.value',
			CHANGE_INPUT_VALUE: 'change.dropdown.input.value',
			TOGGLE_ROOT_OPENED: 'toggle.dropdown.root.opened',
			TOGGLE_ITEMS_OPENED: 'toggle.dropdown.items.opened',
			TOGGLE_INPUT_OPENED: 'toggle.dropdown.input.opened',
			CHANGE_ROOT_DATA_VALUE: 'change.dropdown.root.value',
			CHANGE_ROOT_PLACEHOLDER: 'change.dropdown.root.placeholder',
			CHANGE_INPUT_PLACEHOLDER: 'change.dropdown.root.placeholder',
		};
	}

	static get observedAttributes() {
		return ['value', 'class', 'aria-expanded', 'placeholder', 'data-values'];
	}

	constructor() {
		super();

		const template = document.getElementById('drop-down-template');
		const templateContent = template.content;

		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(templateContent);

		this.root = $('.js-dropdown');
		this.items = $('.js-dropdown__items');
		this.input = $('.js-dropdown__input');
		this.arrowButton = $(`.${IconButton.classes.ICON_BUTTON__ARROW}`);

		this.inputEvents = this.inputEvents.bind(this);
		this.itemsEvents = this.itemsEvents.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.toggleOpened = this.toggleOpened.bind(this);
		this.arrowButtonEvents = this.arrowButtonEvents.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	connectedCallback() {
		this.itemsEvents();
		this.inputEvents();
		this.arrowButtonEvents();
	}

	disconnectedCallback() {
		this.input.off('click.dropdown.input');
		this.input.off('toggle.dropdown.input.opened');
		this.items.off('toggle.dropdown.items.opened');
		this.arrowButton.off('click.arrow-button.dropdown');
		this.arrowButton.off('toggle.dropdown.arrow-button.opened');
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
		this.arrowButton.triggerHandler('toggle.dropdown.arrow-button.opened');
	}

	handleKeyPress(event) {
		event.preventDefault();

		const key = event.which;
		switch (key) {
			case 32:
				this.items.trigger('toggle.dropdown.items.opened');
				this.input.trigger('toggle.dropdown.input.opened');
				this.arrowButton.trigger('toggle.dropdown.arrow-button.opened');
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
			case IconButton.classes.ICON_BUTTON__ARROW:
				elem.toggleClass(IconButton.classes.ICON_BUTTON__ARROW_OPENED);
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

	arrowButtonEvents() {
		this.arrowButton.on({
			'click.arrow-button.dropdown': this.handleClick,
			'toggle.dropdown.arrow-button.opened': this.toggleOpened
		});
	}
}

window.customElements.define('drop-down', DropDown);
