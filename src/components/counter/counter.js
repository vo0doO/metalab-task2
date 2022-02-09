import $ from 'jquery'

class Counter {
	static get observedAttributes() {
		return ['value', 'disabled']
	}

	constructor() {
		this.input = $('.counter__input_spy')
		this.increment = $('.counter__increment')
		this.decrement = $('.counter__decrement')
		this.observer = new MutationObserver(this.observerCallback)
		this._incrementsEvents = this._incrementsEvents.bind(this)
		this._decrementsEvents = this._decrementsEvents.bind(this)
		this._inputsEvents = this._inputsEvents.bind(this)
		this._handleInputChange = this._handleInputChange.bind(this)
	}

	connectedCallback() {
		this._decrementsEvents()
		this._incrementsEvents()
		this._inputsEvents()
		this.observe()
	}

	disconnectedCallback() {
		this.input.off('change.counter.input.value')
		this.increment.off('click.counter.increment')
		this.increment.off('change.counter.increment')
		this.decrement.off('change.counter.decrement')
		this.decrement.off('click.counter.decrement')
		this.observer.takeRecords()
	}

	get observerConfig() {
		return {
			attributes: true,
			attributeOldValue: true,
			attributeFilter: Counter.observedAttributes
		}
	}

	observerCallback(mutations) {
		for (let mutation of mutations) {
			if (mutation.type === 'attributes') {
				let value = mutation.target.value
				let oldValue = mutation.oldValue
				if (value !== oldValue) {
					$(mutation.target).trigger('change.counter.input.value')
				}
			}
		}
	}

	observe() {
		Array.map(this.input.get(), (node) => {
			this.observer.observe(node, this.observerConfig)
		})
	}

	getDisabled(item) {
		return $(item).attr('disabled')
	}

	setDisabled(item) {
		let disabled = this.getDisabled(item)
		if (disabled === 'disabled') {
			return
		}
		$(item).attr('disabled', '')
		return
	}

	removeDisabled(item) {
		let disabled = this.getDisabled(item)
		if (disabled !== 'disabled') {
			return
		}
		item.removeAttr('disabled')
	}

	toggleDisabled(input, incr, decr) {
		const max = parseInt(input.attr('max'))
		const min = parseInt(input.attr('min'))
		const val = parseInt(input.val())
		if (val < max && val >= min) {
			this.removeDisabled(incr)
		}
		if (val >= max) {
			this.setDisabled(incr)
		}
		if (val > min) {
			this.removeDisabled(decr)
		}
		if (val <= min) {
			this.setDisabled(decr)
		}
	}

	_handleInputChange(event, elem) {
		let incr = $(event.target).next()
		let decr = $(event.target).prev()
		incr.triggerHandler('change.counter.increment', {
			incr: incr,
			decr: decr
		})
		decr.triggerHandler('change.counter.decrement', {
			incr: incr,
			decr: decr
		})
	}

	_inputsEvents() {
		const self = this
		self.input.each(function () {
			var elem = $(this)
			elem.on({
				'change.counter.input.value': self._handleInputChange
			})
		})
	}

	_incrementsEvents() {
		const self = this
		self.increment.each(function () {
			var elem = $(this)
			var input = elem.prev().get()[0]
			elem.on({
				'click.counter.increment': function (event) {
					input.stepUp()
					$(input).attr('value', input.value)
				},
				'change.counter.increment': (event, data) => {
					self.toggleDisabled($(input), data.incr, data.decr)
				}
			})
		})
	}

	_decrementsEvents() {
		const self = this
		self.decrement.each(function () {
			var elem = $(this)
			var input = elem.next().get()[0]
			elem.on({
				'click.counter.decrement': function (event) {
					input.stepDown()
					$(input).attr('value', input.value)
				},
				'change.counter.decrement': (event, data) => {
					self.toggleDisabled($(input), data.incr, data.decr)
				}
			})
		})
	}
}

const ready = async () => {
	try {
		document.addEventListener('DOMContentLoaded', () => {
			const counter = new Counter()
			counter.connectedCallback()
			console.info('Counter init')
			console.clear()
		})
	} catch (e) {
		throw new Error(`DOM not loaded: ${e}`)
	}
}

ready()

export { Counter }
