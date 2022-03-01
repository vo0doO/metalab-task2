/* eslint-disable max-classes-per-file */
import $ from 'jquery';

/**
 * @vo0doO
 * @interface(Button)
 * TODO: Observerd attr -> handleChangeAttributes
 * TODO: Sync property values in attributes and DOM
 **/

export class Button extends HTMLButtonElement {
	static get observedAttributes() {
		return getRootProps( root );
	}

	static get elements () {
		return {
			ARROW: 'js-button-icon__arrow_color_gray',
			TEXT: 'js-button-text',
		};
	}

	static get events() {
		return {
			CLICK_ARROW: 'click.arrow-button',
			CLICK_TEXT_RESET: 'click.clear-button',
			CLICK_TEXT_ACCEPT: 'click.confirm-button',
			TOGGLE_TEXT_RESET: "", 
		};
	}

	constructor() {
		super();
	}

	connectedCallBack () {
	}

	disconnectedCallBack() {

	}

	attributesChangedCallback(element, oldValue, newValue) {
		console.info( element, oldValue, newValue );
	}

}

export class ButtonIcon extends Button {
	constructor() {
		super();
	}
}

export class ButtonText extends Button {
	constructor () {
		super();
	}
}

window.customElements.define( 'toxin-button', Button, { extends: 'button' } );
window.customElements.define( 'button-icon', ButtonIcon, { extends: 'button' } );
window.customElements.define( 'button-text', ButtonText, { extends: 'button' } );

function getRootProps () {
	return [
		'class',
		'aria-role',
		'tabindex',
		'hidden',
		'disabled',
		'value',
		'innerText',
		'outerText',
		'accessKey',
		'lang',
		'title',
		'translate',
		'offsetHeight',
		'offsetLeft',
		'offsetParent',
		'offsetTop',
		'offsetWidth',
		'form',
		'formAction',
		'formEnctype',
		'formMethod',
		'formNoValidate',
		'formTarget',
		'labels',
		'name',
		'type',
		'validationMessage',
		'validity',
		'willValidate',
	];
}
