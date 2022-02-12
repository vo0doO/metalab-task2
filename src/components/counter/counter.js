import $ from 'jquery';

export default class Counter extends HTMLElement {
	static get counterClassList() {
		return {
			INPUT: 'counter__input',
			FIELD: 'counter__field',
			HIDDEN: 'counter__input_hidden',
			INCREMENT: 'counter__increment-button',
			DECREMENT: 'counter__decrement-button',
		};
	}

	static get counterEventsList() {
		return {
			CHANGE_INPUT_VALUE: 'change.counter.input.value',
			CLICK_INCREMENT_BUTTON: 'click.counter.increment-button',
			CLICK_DECREMENT_BUTTON: 'click.counter.decrement',
			CHANGE_INCREMENT_BUTTON_STYLE: 'change.counter.increment-button.style',
			CHANGE_DECREMENT_BUTTON_STYLE: 'change.counter.decrement-button.style'
		};
	}

	static setDisabled(element) {
		const disabled = Counter.getDisabled(element);
		if (disabled === 'disabled') {
			return;
		}
		$(element).attr('disabled', '');
	}

	static getDisabled(element) {
		return $(element).attr('disabled');
	}

	static removeDisabled(element) {
		const disabled = Counter.getDisabled(element);
		if (disabled !== 'disabled') {
			return;
		}
		element.removeAttr('disabled');
	}

	get counterObserverConfig() {
		return {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: Counter.observedAttributes
		};
	}

	static get observedAttributes() {
		return ['value', 'disabled'];
	}

	constructor() {
		super();

		this.counterInput = $(`.counter__input_hidden#${this.id}`);
		this.counterDecrementButton = $(`.counter__decrement-button#${this.id}`);
		this.counterIncrementButton = $(`.counter__increment-button#${this.id}`);

		this.connectedCallback = this.connectedCallback.bind(this);
		this.disconnectedCallback = this.disconnectedCallback.bind(this);

		this.counterInputEvents = this.counterInputEvents.bind(this);
		this.counterDecrementEvents = this.counterDecrementEvents.bind(this);
		this.counterIncrementEvents = this.counterIncrementEvents.bind(this);

		this.attributeChangedCallback = this.attributeChangedCallback.bind(this);
		this.handleClickCounterButton = this.handleClickCounterButton.bind(this);
		this.handleChangeCounterInputValue = this.handleChangeCounterInputValue.bind(this);

		this.counterObserver = new MutationObserver(this.counterObserverCallback);
	}

	connectedCallback() {
		this.counterObserve();
		this.counterInputEvents();
		this.counterDecrementEvents();
		this.counterIncrementEvents();
	}

	disconnectedCallback() {
		this.counterObserver.takeRecords();
		this.counterInput.off('change.counter.input.value');
		this.counterDecrementButton.off('click.counter.decrement');
		this.counterIncrementButton.off('click.counter.increment-button');
		this.counterIncrementButton.off('change.counter.increment-button.style');
		this.counterDecrementButton.off('change.counter.decrement-button.style');
	}

	attributeChangedCallback(element, newValue, oldValue) {
		console.log(`${[element, newValue, oldValue]}`);
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
		const val = parseInt(data.input.val(), 10);
		const max = parseInt(data.input.attr('max'), 10);
		const min = parseInt(data.input.attr('min'), 10);

		if (val < max && val >= min) {
			Counter.removeDisabled(data.incr);
		}

		if (val >= max) {
			Counter.setDisabled(data.incr);
		}

		if (val > min) {
			Counter.removeDisabled(data.decr);
		}

		if (val <= min) {
			Counter.setDisabled(data.decr);
		}
	}

	counterInputEvents() {
		this.counterInput.on({
			'change.counter.input.value': this.handleChangeCounterInputValue
		});
	}

	handleClickCounterButton(event) {
		const element = event.target;
		const cl = element.className;
		const input = element.nextSibling || element.previousSibling;

		switch (cl) {
			case 'counter__increment-button': {
				input.stepUp();
				$(input).attr('value', input.value);
				break;
			}

			case 'counter__decrement-button': {
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

	counterObserve() {
		Array.map(this.counterInput.get(), (node) => {
			this.counterObserver.observe(node, this.counterObserverConfig);
		});
	}

	counterObserverCallback(mutations) {
		mutations.forEach((mutation) => {
			if (mutation.type === 'attributes') {
				const { oldValue } = mutation;
				const { value } = mutation.target;
				if (value !== oldValue) {
					$(mutation.target).trigger('change.counter.input.value');
				}
			}
		});
	}
}

window.customElements.define('guests-counter', Counter);
