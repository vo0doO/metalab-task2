/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
import $ from 'jquery';

class CustomCounter extends HTMLElement {
	static get observedAttributes() {
		return ['value', 'disabled'];
	}

	constructor() {
		super();

		this.input = $('.counter__input_spy#' + this.id.toString());
		this.increment = $('.counter__increment#' + this.id.toString());
		this.decrement = $('.counter__decrement#' + this.id.toString());
		this.observer = new MutationObserver(this.observerCallback);
		this.connectedCallback = this.connectedCallback.bind(this);
		this.disconnectedCallback = this.disconnectedCallback.bind(this);
		this._incrementsEvents = this._incrementsEvents.bind(this);
		this._decrementsEvents = this._decrementsEvents.bind(this);
		this._inputsEvents = this._inputsEvents.bind(this);
		this._handleInputChange = this._handleInputChange.bind(this);
		this.toggleDisabled = this.toggleDisabled.bind(this);
	}

	connectedCallback() {
		this._decrementsEvents();
		this._incrementsEvents();
		this._inputsEvents();
		// this.toggleDisabled();
		this.observe();
	}

	disconnectedCallback() {
		this.input.off('change.counter.input.value');
		this.increment.off('click.counter.increment');
		this.increment.off('change.counter.increment');
		this.decrement.off('change.counter.decrement');
		this.decrement.off('click.counter.decrement');
		this.observer.takeRecords();
	}

	attributeChangedCallback(name, oldValue, newValue) {}

	get observerConfig() {
		return {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: CustomCounter.observedAttributes
		};
	}

	observerCallback(mutations) {
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

	observe() {
		Array.map(this.input.get(), (node) => {
			this.observer.observe(node, this.observerConfig);
		});
	}

	getDisabled(item) {
		return $(item).attr('disabled');
	}

	setDisabled(item) {
		const disabled = this.getDisabled(item);
		if (disabled === 'disabled') {
			return;
		}
		$(item).attr('disabled', '');
	}

	removeDisabled(item) {
		const disabled = this.getDisabled(item);
		if (disabled !== 'disabled') {
			return;
		}
		item.removeAttr('disabled');
	}

	toggleDisabled(event, data) {
		const max = parseInt(data.input.attr('max'), 10);
		const min = parseInt(data.input.attr('min'), 10);
		const val = parseInt(data.input.val(), 10);
		if (val < max && val >= min) {
			this.removeDisabled(data.incr);
		}
		if (val >= max) {
			this.setDisabled(data.incr);
		}
		if (val > min) {
			this.removeDisabled(data.decr);
		}
		if (val <= min) {
			this.setDisabled(data.decr);
		}
	}

	_handleInputChange(event) {
		const incr = $(event.target).next();
		const decr = $(event.target).prev();
		const input = $(event.target);
		incr.triggerHandler('change.counter.increment', {
			input,
			incr,
			decr
		});
		decr.triggerHandler('change.counter.decrement', {
			input,
			incr,
			decr
		});
	}

	_inputsEvents() {
		const self = this;
		self.input.on({
			'change.counter.input.value': self._handleInputChange
		});
	}

	_incrementsEvents() {
		const self = $(this);
		const elem = $(this.increment);
		const input = elem.prev().get()[0];
		elem.on({
			'click.counter.increment': () => {
				input.stepUp();
				$(input).attr('value', input.value);
			},
			'change.counter.increment': this.toggleDisabled
		});
	}

	_decrementsEvents() {
		const self = this;
		const elem = $(this.decrement);
		const input = elem.next().get()[0];
		elem.on({
			'click.counter.decrement': () => {
				input.stepDown();
				$(input).attr('value', input.value);
			},
			'change.counter.decrement': self.toggleDisabled
		});
	}
}

window.customElements.define('custom-counter', CustomCounter);

export { CustomCounter };
