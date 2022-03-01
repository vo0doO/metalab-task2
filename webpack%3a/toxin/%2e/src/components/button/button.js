/* eslint-disable max-classes-per-file */
import $ from 'jquery';

/**
 * @vo0doO
 * @interface(Button)
 * TODO: Observerd attr -> handleChangeAttributes
 * TODO: Sync property values in attributes and DOM
 **/

class Button extends HTMLButtonElement {
	static get observedAttributes() {
		return getRootProps( root );
	}

	static get classes() {
		return {
			IBUTTON__ARROW: 'js-button-icon__arrow_color_gray',
			CLEAR_BUTTON: 'js-clear-button',
			CONFIRM_BUTTON: 'js-confirm-button',
			IBUTTON__ARROW_OPENED: 'js-button-icon__arrow_color_gray_opened',
			CLEAR_BUTTON_OPENED: 'js-clear-button_opened',
			CONFIRM_BUTTON_OPENED: 'js-confirm-button_opened',
		};
	}

	static get events() {
		return {
			CLICK_ARROW_BUTTON: 'click.arrow-button',
			CLICK_CLEAR_BUTTON: 'click.clear-button',
			CLICK_CONFIRM_BUTTON: 'click.confirm-button',
			TOGGLE_ARROW_BUTTON_OPENED: 'toggle.arrow-button.opened',
			TOGGLE_CLEAR_BUTTON_OPENED: 'toggle.clear-button.opened',
			TOGGLE_CONFIRM_BUTTON_OPENED: 'toggle.confirm-button.opened',
		};
	}

	constructor() {
		self = super();
	}

	connectedCallBack () {
	}

	disconnectedCallBack() {

	}

	attributesChangedCallback(element, oldValue, newValue) {
		console.info( element, oldValue, newValue );
	}

}


class ButtonIcon extends Button {
	constructor() {
		self = super();
		const template = document.getElementById( this.nodeName );
		const templateContent = template.content;
		this.attachShadow( { mode: 'open', delegatesFocus: true } ).appendChild( templateContent.cloneNode( true ) );
	}
}

class ButtonText extends Button {
	constructor() {
		self = super();
		const template = document.getElementById( this.nodeName );
		const templateContent = template.content;
		this.attachShadow( { mode: 'open', delegatesFocus: true } ).appendChild( templateContent.cloneNode( true ) );
	}
}

window.customElements.define( 'toxin-button', Button, { extends: 'button' } );
window.customElements.define( 'button-icon', ButtonIcon, { extends: 'button' } );
window.customElements.define( 'button-text', ButtonText, { extends: 'button' } );

export { Button, ButtonIcon }

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
