import $ from 'jquery';
import { Button } from '../button/button.js';
import { Counter } from '../counter/counter';
import { words, wordOfNum } from '../../utils/js/index';

class DropDown extends HTMLElement {
	static get elements () {
		return {
			ROOT: 'js-dropdown',
			INPUT: 'js-dropdown__input',
			ITEMS: 'js-dropdown__items',
			ROOT_OPENED: `js-dropdown_opened`,
			INPUT_OPENED: `js-dropdown__input_opened`,
			ITEMS_OPENED: `js-dropdown__items_opened`,
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

	constructor () {
		super();

		const template = document.getElementById( this.nodeName );
		const templateContent = template.content;
		this.attachShadow( { mode: 'open' } ).appendChild( templateContent.cloneNode( true ) );
		this.elements = DropDown.elements;
		this.root = $( `.${DropDown.elements.ROOT}` );
		this.items = $( `.${DropDown.elements.ITEMS}` );
		this.input = $( `.${DropDown.elements.INPUT}` );
		this.arrowButton = $( `.${Button.elements.ARROW}` );
		this.inputEvents = this.inputEvents.bind(this);
		this.itemsEvents = this.itemsEvents.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.toggleOpened = this.toggleOpened.bind(this);
		this.arrowButtonEvents = this.arrowButtonEvents.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.rootEvents = this.rootEvents.bind( this );
	}

	connectedCallback() {
		this.itemsEvents();
		this.inputEvents();
		this.arrowButtonEvents();
		this.rootEvents();
	}

	disconnectedCallback() {
		this.input.off('click.dropdown.input');
		this.input.off('toggle.dropdown.input.opened');
		this.items.off('toggle.dropdown.items.opened');
		this.arrowButton.off('click.arrow-button.dropdown');
		this.arrowButton.off('toggle.dropdown.arrow-button.opened');
	}

	getGuestsInputString () {
		let guests = 0;
		let babys = 0;
		const elements = $( `.${Counter.elements.ROOT}` )
		elements.each( ( index ) => {
			const id = $( elements[index] ).attr( 'id' );
			let value = $( elements[index] ).attr( 'value' );
			if( id === "взрослые" ) {
				guests += parseInt( value, 10 );
			}
			if( id === "дети" ) {
				guests += parseInt( value, 10 );
			}
			if( id === "младенцы" ) {
				babys += parseInt( value, 10 );
			}
		} );
		if( guests <= 0 ) {
			return 'Сколько гостей'
		}
		if( guests > 0 && babys > 0 ) {
			const stringGuests = wordOfNum( guests, words['гости'] );
			const stringBabys = wordOfNum( babys, words['младенцы'] );
			return `${guests} ${stringGuests}, ${babys} ${stringBabys}`;
		}
		if( guests > 0 && babys <= 0 ) {
			const stringGuests = wordOfNum( guests, words['гости'] );
			return `${guests} ${stringGuests}`;
		}
	}

	setInputString ( event ) {
		let resultString = "";
		const node = event.target.nodeName
		switch( node ) {
			case 'GUESTS-COUNTER':
				resultString = this.getGuestsInputString();
				this.input.attr( 'value', resultString );
				break;
			default:
				break;
		}
	}

	rootEvents () {
		$( this.root ).on(
			Counter.events.CHANGE_ROOT_VALUE,
			`.${Counter.elements.ROOT}`,
			( event ) => {
				const target = $( event.target );
				console.log( `Value: ${target.attr( 'value' )} \n Title: ${target.attr( 'title' )}` );
				this.setInputString( event );
			}
		)
	}

	attributeChangedCallBack ( value, oldValue, newValue ) {
		console.log( `Dropdown attribute changed: \n Element: ${element} \n oldvalue ${oldValue} \n newValue ${newValue}` );
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
		this.items.trigger( 'toggle.dropdown.items.opened' );
		this.input.trigger( 'toggle.dropdown.input.opened' );
		this.arrowButton.trigger( 'toggle.dropdown.arrow-button.opened' );
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
		const cls = elem.attr( 'class' ).split( ' ' );
		switch( ( ( cls[1] || cls[0] ) || ( cls[1] && cls[0] ) ).replace( '_opened', '' ) ) {
			case 'js-dropdown__items':
				elem.toggleClass('js-dropdown__items_opened');
				break;
			case 'js-dropdown__input':
				elem.toggleClass('js-dropdown__input_opened');
				this.ariaExpandedToggle(elem);
				break;
			case 'js-button-icon__arrow_color_gray':
				elem.get( 0 ).toggleAttribute( "pressed" );
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
		this.input.on( 'change', 'js-counter__input_hidden', function () { console.log( 'im changed' ); } )
	}

	arrowButtonEvents() {
		this.arrowButton.on({
			'click.arrow-button.dropdown': this.handleClick,
			'toggle.dropdown.arrow-button.opened': this.toggleOpened
		});
	}
}

class DropDownWithButtons extends DropDown {

	static get elements() {
		return {
			ROOT: 'drop-down-with-buttons',
			FOOTER_BUTTONS: 'js-dropdown__footer-buttons',
			RESET_BUTTON: 'js-dropdown__reset-button',
			ACCEPT_BUTTON: 'js-dropdown__accept-button'
		}
	}

	constructor () {
		super();
		super.rootEvents();
		this.root = $( `.${DropDownWithButtons.elements.ROOT}` );
		this.footerButtons = $( `.${DropDownWithButtons.elements.FOOTER_BUTTONS}` );
		this.resetButton = $( `.${DropDownWithButtons.elements.RESET_BUTTON}` );
		this.acceptButton = $(`.${DropDownWithButtons.elements.ACCEPT_BUTTON}`);
		// this.rootEvents = super.rootEvents.bind(this);
		this.buttonsEvents = this.buttonsEvents.bind(this);
	}

	connectedCallback () {
		super.itemsEvents();
		super.inputEvents();
		super.arrowButtonEvents();
		if( this.footerButtons.attr( 'disabled' ) ) {
			return;
		}
		this.footerButtons.attr( "disabled", "" );
		this.buttonsEvents();
	}

	buttonsEvents() {
		$(this.root).on(
			'toggle',
			'.js-dropdown__items',
			(event) => {
				console.log('Items opened for buttons events')
			}
		)
	}


}

window.customElements.define( 'drop-down', DropDown );
window.customElements.define( 'drop-down-with-buttons', DropDownWithButtons );
export { DropDown, DropDownWithButtons };