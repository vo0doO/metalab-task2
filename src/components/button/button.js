/* eslint-disable max-classes-per-file */
import { c } from '../../utils/js/index';

class ToxinButton extends HTMLButtonElement {
	static get observedAttributes() {
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

	static get classes() {
		return {
			ICON_BUTTON__ARROW: 'js-icon-button__arrow',
			CLEAR_BUTTON: 'js-clear-button',
			CONFIRM_BUTTON: 'js-confirm-button',
			ICON_BUTTON__ARROW_OPENED: 'js-icon-button__arrow_opened',
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
		super();
		this.handleClick = this.handleClick.bind(this);
		this.drawRipple = this.drawRipple.bind(this);
	}

	handleClick() {
		this.addEventListener(
			'click',
			(event) => this.drawRipple(event, event.target, event.offsetX, event.offsetY),
			{ bubbles: true, cancelable: true, composed: true }
		);
	}

	connectedCallBack() {
		this.handleClick();
		this.drawRipple();
		this.tabIndex.set(1);
		this.ariaPressed.set('true');
	}

	disconnectedCallBack() {
		this.removeEventListener('click', this.drawRipple);
	}

	attributesChangedCallback(element, oldValue, newValue) {
		c.info(element, oldValue, newValue);
	}

	drawRipple(event, element, x, y) {
		console.log(`Element: ${element}, ${event.composedPath}`);
		const div = document.createElement('div');
		div.style = 'align-items: center;display: flex;justify-content: center;width: 30px;height: 30px;padding-right: 6px;padding-left: 6px;border: 1px solid rgb(31 32 65 / 0.25);border-radius: 22px;color: rgb(31 32 65 / 0.5);font-weight: normal;font-style: normal;font-size: 18px;line-height: 22px;cursor: pointer; background-color: red; z-index:999!important; position:absolute; opacity: 0.5';
		div.classList.add('ripple');
		element.appendChild(div);
		div.style.top = `${y}px`;
		div.style.left = `${x}px`;
		div.style.backgroundColor = 'red';
		div.classList.add('run');
		div.addEventListener('transitionend', () => div.remove());
	}

	transition() {
		document.querySelector('.run').dispatchEvent(new TransitionEvent('transitionend', { elapsedTime: 500, propertyName: 'backgroundColor' }));
	}
}
window.customElements.define('toxin-button', ToxinButton, { extends: 'button' });

class IconButton extends ToxinButton {
	constructor() {
		super();
		this.wrapper = document.createElement('div');
		this.template = document.querySelector('template#btn-template');
		$(this.template.content).wrap(this.template.content, this.wrapper);
		this.content = this.template.content.cloneNode(true);
		this.attachShadow({ mode: 'open', delegatesFocus: true });
		this.shadowRoot.innerHTML = this.content.outerHtml;
		// this.handleClick = this.handleClick.bind(this);
		// this.toggleOpened = this.toggleOpened.bind(this);
	}

	handleClick() {
		this.button.dispatchEvent('click', (event) => { c.log('click', event); });
		this.onclick = (event) => { c.log('click', event); };
		this.addEventListener('click', (event) => { c.log('click', event); });
	}

	toggleOpened() {
		const cls = this.classList('class').split(' ')[0];
		switch (cls) {
			case ToxinButton.classes.ARROW_BUTTON:
				$(this).toggleClass(ToxinButton.classes.ARROW_BUTTON_OPENED);
				break;
			default:
				throw new Error("Ошибка замены класса - 'opened'");
		}
	}

	connectedCallBack() {
		this.toggleOpened();
	}
}
window.customElements.define('icon-button', IconButton, { extends: 'button' });
export { ToxinButton, IconButton };
