import $ from 'jquery';
import {
	words, wordOfNum, getDisabled, setDisabled, removeDisabled
} from '../../utils/js/index';

export default class Counter extends HTMLElement {
	static get classes() {
		return {
			ROOT: 'js-counter',
			INPUT: 'js-counter__input',
			FIELD: 'js-counter__field',
			HIDDEN: 'js-counter__input_hidden',
			INCREMENT: 'js-counter__increment-button',
			DECREMENT: 'js-counter__decrement-button',
		};
	}

	static get events() {
		return {
			CHANGE_ROOT_TITLE: 'change.counter.root.title',
			CHANGE_ROOT_VALUE: 'change.counter.root.value',
			CHANGE_INPUT_VALUE: 'change.counter.input.value',
			CLICK_INCREMENT_BUTTON: 'click.counter.increment-button',
			CLICK_DECREMENT_BUTTON: 'click.counter.decrement-button',
			CHANGE_INCREMENT_BUTTON_STATE: 'change.counter.increment-button.state',
			CHANGE_DECREMENT_BUTTON_STATE: 'change.counter.decrement-button.state'
		};
	}

	static get observedAttributes() {
		return ['value'];
	}

	constructor() {
		super();

		this.root = $(`.js-counter#${this.id}`);
		this.input = $(`.js-counter__input_hidden#${this.id}`);
		this.decrementButton = $(`.js-counter__decrement-button#${this.id}`);
		this.incrementButton = $(`.js-counter__increment-button#${this.id}`);

		this.connectedCallback = this.connectedCallback.bind(this);
		this.disconnectedCallback = this.disconnectedCallback.bind(this);

		this.rootEvents = this.rootEvents.bind(this);
		this.inputEvents = this.inputEvents.bind(this);
		this.decrementButtonEvents = this.decrementButtonEvents.bind(this);
		this.incrementButtonEvents = this.incrementButtonEvents.bind(this);

		this.attributeChangedCallback = this.attributeChangedCallback.bind(this);
		this.handleClickButton = this.handleClickButton.bind(this);
		this.handleChangeRootValue = this.handleChangeRootValue.bind(this);
		this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
		this.handleChangeButtonState = this.handleChangeButtonState.bind(this);
		this.inputObserver = new MutationObserver(this.inputObserverCallback);
	}

	connectedCallback() {
		this.inputObserve();
		this.rootEvents();
		this.inputEvents();
		this.decrementButtonEvents();
		this.incrementButtonEvents();
	}

	disconnectedCallback() {
		this.inputObserver.takeRecords();
		this.input.off(Counter.events.CHANGE_INPUT_VALUE);
		this.decrementButton.off(Counter.events.CHANGE_DECREMENT_BUTTON_STATE);
		this.incrementButton.off(Counter.events.CHANGE_INCREMENT_BUTTON_STATE);
		this.incrementButton.off(Counter.events.CLICK_INCREMENT_BUTTON);
		this.decrementButton.off(Counter.events.CLICK_DECREMENT_BUTTON);
	}

	attributeChangedCallback(element, oldValue, newValue) {
		const oldV = parseInt(oldValue, 10);
		const newV = parseInt(newValue, 10);

		if (oldV === newV && newV < 0) {
			return;
		}

		this.handleChangeRootValue(null, { value: newV, id: this.id });
	}

	inputObserve() {
		Array.map(this.input.get(), (node) => {
			this.inputObserver.observe(node, this.inputObserverConfig);
		});
	}

	get inputObserverConfig() {
		return {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: Counter.observedAttributes
		};
	}

	inputObserverCallback(mutations) {
		mutations.forEach((mutation) => {
			if (mutation.type === 'attributes') {
				const { oldValue } = mutation;
				const { value } = mutation.target;
				if (value !== oldValue) {
					$(mutation.target).trigger(Counter.events.CHANGE_INPUT_VALUE);
					$(this.root).attr('value', mutation.target.value);
				}
			}
		});
	}

	rootEvents() {
		this.root.on(
			Counter.events.CHANGE_ROOT_TITLE,
			(event, data) => [event, ...data],
		);
	}

	inputEvents() {
		this.input.on({
			'change.counter.input.value': this.handleChangeInputValue
		});
	}

	incrementButtonEvents() {
		this.incrementButton.on({
			'click.counter.increment-button': this.handleClickButton,
			'change.counter.increment-button.state': this.handleChangeButtonState
		});
	}

	decrementButtonEvents() {
		this.decrementButton.on({
			'click.counter.decrement-button': this.handleClickButton,
			'change.counter.decrement-button.state': this.handleChangeButtonState
		});
	}

	handleChangeInputValue(_event) {
		const { input } = this;
		if (_event.target !== this.input.get(0)) {
			throw new Error(`Ошибка обработчика события ${event}`);
		}

		const incr = this.incrementButton;
		const decr = this.decrementButton;

		incr.triggerHandler(Counter.events.CHANGE_INCREMENT_BUTTON_STATE, {
			input,
			incr,
			decr
		});

		decr.triggerHandler(Counter.events.CHANGE_DECREMENT_BUTTON_STATE, {
			input,
			incr,
			decr
		});
	}

	handleChangeRootValue(_event, data) {
		const title = wordOfNum(data.value, words[data.id]);
		this.root.attr('title', title);
		this.root.trigger(Counter.events.CHANGE_ROOT_TITLE, [data.id, title, data.value]);
	}

	handleChangeButtonState(_event, data) {
		const val = parseInt(data.input.val(), 10);
		const max = parseInt(data.input.attr('max'), 10);
		const min = parseInt(data.input.attr('min'), 10);

		if (val < max && val >= min) {
			removeDisabled(data.incr);
		}

		if (val >= max) {
			setDisabled(data.incr);
		}

		if (val > min) {
			removeDisabled(data.decr);
		}

		if (val <= min) {
			setDisabled(data.decr);
		}
	}

	handleClickButton(_event) {
		const element = _event.target;
		const cl = element.className;
		const input = element.nextSibling || element.previousSibling;

		switch (cl) {
			case Counter.classes.INCREMENT: {
				input.stepUp();
				$(input).attr('value', input.value);
				break;
			}

			case Counter.classes.DECREMENT: {
				input.stepDown();
				$(input).attr('value', input.value);
				break;
			}

			default: {
				throw new Error(`Ошибка обработки события: ${event}`);
			}
		}
	}
}

window.customElements.define('guests-counter', Counter);
