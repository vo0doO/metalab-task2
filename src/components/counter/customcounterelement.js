import $ from 'jquery'

class CustomCounter extends HTMLElement {
	static get observedAttributes() {
		return ['value', 'aria-expanded', 'tabindex', 'disabled']
	}

	static classList() {
		return {
			FIELD: 'counter__field',
			DECREMENT: 'counter__decrement',
			INCREMENT: 'counter__increment',
			INPUT: 'counter__input',
			SPY: 'counter__input_spy'
		}
	}

	constructor() {
		super()
		this.template = document.querySelector('template')
		this.input = document.querySelector('.counter__input_spy')
		this.increment = document.querySelector('.counter__increment')
		this.decrement = document.querySelector('.counter__decrement')
		this.appendChild(this.template.content.cloneNode(true))
	}

	connectedCallback() {
		this._addDecrementsEventsListener()
		this._addDecrementsEventsListener()
	}

	disconectedCallback() {
		this.increment.removeEventListener('click', this._onClick)
		this.decrement.removeEventListener('click', this._onClick)
	}

	set disabled(value) {
		const isDisabled = Boolean(value)
		if (isDisabled) {
			this.setAttribute('disabled', '')
		} else {
			this.removeAttribute('disabled')
		}
	}

	get disabled() {
		return this.hasAttribute('disabled')
	}

	attributeChangedCallback(name, oldValue, newValue) {
		const hasValue = newValue !== null
		switch (name) {
			case 'disabled':
				this.setAttribute('disabled', hasValue)
				break
			default:
		}
	}

	addIncrementsEventsListener() {
		const ctx = this
		ctx.increment.each(() => {
			const elem = $(this)
			const input = elem.prev().get()[0]
			elem.on({
				click() {
					input.stepUp()
					$(input).attr('value', input.value)
				}
			})
		})
	}

	_addDecrementsEventsListener() {
		const ctx = this
		ctx.decrement.each(function () {
			const elem = $(this)
			const input = elem.next().get()[0]
			elem.on({
				click(event) {
					input.stepDown()
					$(input).attr('value', input.value)
				}
			})
		})
	}
}

const ready = async () => {
	try {
		document.addEventListener('DOMContentLoaded', () => {
			window.customElements.define('custom-counter', CustomCounter)
		})
	} catch (e) {
		throw new Error(`DOM not loaded: ${e}`)
	}
}

ready()

export { CustomCounter }
