const $ = require( 'jquery' );
const { words, wordOfNum, setDisabled, removeDisabled, sleep } = require( '../../utils/js/index' );


class Counter extends HTMLElement {
	static get elements () {
		return {
			ROOT: 'js-counter',
			INPUT: 'js-counter__input',
			HIDDEN: 'js-counter__input_hidden',
			INCREMENT: 'js-counter__increment-button',
			DECREMENT: 'js-counter__decrement-button',
		};
	}

	static get events() {
		return {
			CHANGE_ROOT_TITLE: 'change:counter:root.title',
			CHANGE_ROOT_VALUE: 'change:counter:root.value',
			CHANGE_INPUT_VALUE: 'change:counter:input.value',
			CLICK_INCREMENT_BUTTON: 'click.counter.increment-button',
			CLICK_DECREMENT_BUTTON: 'click.counter.decrement-button',
			CHANGE_INCREMENT_BUTTON_STATE: 'change:counter:increment-button.state',
			CHANGE_DECREMENT_BUTTON_STATE: 'change:counter:decrement-button.state'
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
		this.inputEvents();
		this.decrementButtonEvents();
		this.incrementButtonEvents();
	}

	disconnectedCallback() {
		this.inputObserver.takeRecords();
		this.input.off( Counter.events.CHANGE_INPUT_VALUE );
		this.decrementButton.off( Counter.events.CHANGE_DECREMENT_BUTTON_STATE );
		this.incrementButton.off( Counter.events.CHANGE_INCREMENT_BUTTON_STATE );
		this.incrementButton.off( Counter.events.CLICK_INCREMENT_BUTTON );
		this.decrementButton.off( Counter.events.CLICK_DECREMENT_BUTTON );
	}

	attributeChangedCallback ( element, oldValue, newValue ) {
		const oldV = parseInt(oldValue, 10);
		const newV = parseInt(newValue, 10);

		if (oldV === newV && newV < 0) {
			return;
		}

		this.handleChangeRootValue( event, { value: newV, id: this.id } );
	}

	inputObserve() {
		// eslint-disable-next-line array-callback-return
		this.input.get().map((node) => {
			this.inputObserver.observe(node, this.inputObserverConfig);
		});
	}

	get inputObserverConfig () {
		return {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: Counter.observedAttributes
		};
	}

	inputObserverCallback ( mutations ) {
		mutations.forEach((mutation) => {
			if (mutation.type === 'attributes') {
				const { oldValue } = mutation;
				const { value } = mutation.target;
				if (value !== oldValue) {
					$( mutation.target ).trigger( Counter.events.CHANGE_INPUT_VALUE, { value: mutation.target.value } );
				}
			}
		});
	}

	inputEvents() {
		this.input.on({
			'change:counter:input.value': this.handleChangeInputValue
		});
	}

	incrementButtonEvents() {
		this.incrementButton.on({
			'click.counter.increment-button': this.handleClickButton,
			'change:counter:increment-button.state': this.handleChangeButtonState
		});
	}

	decrementButtonEvents() {
		this.decrementButton.on({
			'click.counter.decrement-button': this.handleClickButton,
			'change:counter:decrement-button.state': this.handleChangeButtonState
		});
	}

	handleChangeInputValue ( event, data ) {
		const { input, root } = this;
		if( event.target !== this.input.get( 0 ) ) {
			throw new Error(`Ошибка обработчика события ${event}`);
		}

		const incr = this.incrementButton;
		const decr = this.decrementButton;

		root.attr( 'value', data.value )

		incr.triggerHandler( Counter.events.CHANGE_INCREMENT_BUTTON_STATE, {
			input,
			incr,
			decr
		});

		decr.triggerHandler( Counter.events.CHANGE_DECREMENT_BUTTON_STATE, {
			input,
			incr,
			decr
		});
	}

	handleChangeRootValue ( event, data ) {
		const title = wordOfNum(data.value, words[data.id]);
		this.root.attr( 'title', title );
		this.root.trigger( Counter.events.CHANGE_ROOT_VALUE )
	}

	handleChangeButtonState ( event, data ) {
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

	async handleClickButton ( event ) {
		const element = event.target;
		const cl = element.className;
		const input = element.nextSibling || element.previousSibling;

		try {
			switch (cl) {
				case Counter.elements.INCREMENT: {
					await input.stepUp();
					await $( input ).attr( 'value', input.value );
					Promise.resolve();
					break;
				}

				case Counter.elements.DECREMENT: {
					await input.stepDown();
					await $( input ).attr( 'value', input.value );
					Promise.resolve();
					break;
				}

				default: {
					throw new Error( `Ошибка обработки события: ${event}` );
				}
			}
		} catch (error) {
			throw new Error( `Ошибка обработки события: ${element}, ${event.offsetX}, ${event.offsetY}` );
		}
	}
}

window.customElements.define( 'guests-counter', Counter );
export { Counter };