import $ from 'jquery';
import intern from 'intern';
import { log } from '../../utils/js/log';

export default class CustomCounter extends HTMLElement {
	static get classList() {
		return {
			FIELD: 'counter__field',
			DECREMENT: 'counter__decrement',
			INCREMENT: 'counter__increment-button',
			INPUT: 'counter__input',
			HIDDEN: 'counter__input_hidden'
		};
	}

	static setDisabled(element) {
		const disabled = CustomCounter.getDisabled(element);
		if (disabled === 'disabled') {
			return;
		}
		$(element).attr('disabled', '');
	}

	static getDisabled(element) {
		return $(element).attr('disabled');
	}

	static removeDisabled(element) {
		const disabled = CustomCounter.getDisabled(element);
		if (disabled !== 'disabled') {
			return;
		}
		element.removeAttr('disabled');
	}

	get counterObserverConfig() {
		return {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: CustomCounter.observedAttributes
		};
	}

	static get observedAttributes() {
		return ['value', 'disabled'];
	}

	constructor() {
		super();

		this.counterInput = $(`.counter__input_hidden#${this.id}`);
		this.counterIncrementButton = $(`.counter__increment-button#${this.id}`);
		this.counterDecrementButton = $(`.counter__decrement#${this.id}`);
		this.connectedCallback = this.connectedCallback.bind(this);
		this.disconnectedCallback = this.disconnectedCallback.bind(this);
		this.counterIncrementEvents = this.counterIncrementEvents.bind(this);
		this.counterDecrementEvents = this.counterDecrementEvents.bind(this);
		this.counterInputEvents = this.counterInputEvents.bind(this);
		this.handleChangeCounterInputValue = this.handleChangeCounterInputValue.bind(this);
		this.handleClickCounterButton = this.handleClickCounterButton.bind(this);
		this.counterObserver = new MutationObserver(this.counterObserverCallback);
	}

	connectedCallback() {
		this.counterDecrementEvents();
		this.counterIncrementEvents();
		this.counterInputEvents();
		this.observe();
	}

	disconnectedCallback() {
		this.counterInput.off('change.counter.input.value');
		this.counterIncrementButton.off('click.counter.increment-button');
		this.counterIncrementButton.off('change.counter.increment-button.style');
		this.counterDecrementButton.off('change.counter.decrement-button.style');
		this.counterDecrementButton.off('click.counter.decrement');
		this.counterObserver.takeRecords();
	}

	attributeChangedCallback(element, newValue, oldValue) {
		log(`${[element, newValue, oldValue]}`);
	}

	handleChangeCounterInputValue(event) {
		const input = this.counterInput;
		if (event.target !== this.counterInput.get(0)) {
			throw new Error(`Ошибка обработчика события ${event}`);
		}

		const incr = this.counterIncrementButton;
		const decr = this.counterDecrementButton;

		incr.triggerHandler('change.counter.increment-button.style', {
			input,
			incr,
			decr
		});

		decr.triggerHandler('change.counter.decrement-button.style', {
			input,
			incr,
			decr
		});
	}

	handleChangeCounterButtonState(_event, data) {
		const max = parseInt(data.input.attr('max'), 10);
		const min = parseInt(data.input.attr('min'), 10);
		const val = parseInt(data.input.val(), 10);
		if (val < max && val >= min) {
			CustomCounter.removeDisabled(data.incr);
		}
		if (val >= max) {
			CustomCounter.setDisabled(data.incr);
		}
		if (val > min) {
			CustomCounter.removeDisabled(data.decr);
		}
		if (val <= min) {
			CustomCounter.setDisabled(data.decr);
		}
	}

	counterInputEvents() {
		this.counterInput.on({
			'change.counter.input.value': this.handleChangeCounterInputValue
		});
	}

	handleClickCounterButton(event) {
		const element = event.target;
		const input = element.nextSibling || element.previousSibling;
		const cl = element.className;
		switch (cl) {
			case 'counter__increment-button': {
				input.stepUp();
				$(input).attr('value', input.value);
				break;
			}
			case 'counter__decrement': {
				input.stepDown();
				$(input).attr('value', input.value);
				break;
			}
			default: {
				throw new Error(`Ошибка обработки события: ${event}`);
			}
		}
	}

	counterIncrementEvents() {
		const element = $(this.counterIncrementButton);
		element.on({
			'click.counter.increment-button': this.handleClickCounterButton,
			'change.counter.increment-button.style ': this.handleChangeCounterButtonState
		});
	}

	counterDecrementEvents() {
		const element = $(this.counterDecrementButton);
		element.on({
			'click.counter.decrement': this.handleClickCounterButton,
			'change.counter.decrement-button.style': this.handleChangeCounterButtonState
		});
	}

	observe() {
		Array.map(this.counterInput.get(), (node) => {
			this.counterObserver.observe(node, this.counterObserverConfig);
		});
	}

	counterObserverCallback(mutations) {
		mutations.forEach((mutation) => {
			if (mutation.type === 'attributes') {
				const { value } = mutation.target;
				const { oldValue } = mutation;
				if (value !== oldValue) {
					$(mutation.target).trigger('change.counter.input.value');
				}
			}
		});
	}
}

window.customElements.define('guests-counter', CustomCounter);
log();
intern.configure({ suites: './counter.spec.js' });
intern.run();
