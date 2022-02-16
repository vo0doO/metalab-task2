/* eslint-disable object-shorthand */
const { registerSuite } = intern.getPlugin('interface.object');
const { expect } = intern.getPlugin('chai');
const $ = require('jquery');
const { domReady } = require('../../utils/js');

registerSuite('компонент/дропдаун/guests-counter', {
	beforeEach() {
		const counters = document.querySelectorAll('guests-counter');
		const counterInputs = document.querySelectorAll('.js-counter__input');
		const counterIncrementButtons = document.querySelectorAll('.js-counter__increment-button');
		const counterDecrementButtons = document.querySelectorAll('.js-counter__decrement-button');
		this.c = counters;
		this.ci = counterInputs;
		this.cib = counterIncrementButtons;
		this.cdb = counterDecrementButtons;
		return this;
	},
	tests: {
		async 'Все Коунтеры при (value = min) имеют ожидаемые стили кнопок decrement'() {
			const { cdb } = await this.parent;
			cdb.forEach((item) => {
				expect($(item).css('opacity')).equal('0.38');
			});
		},

		async 'Все Коунтеры при (value = min) имеют ожидаемые стили кнопок increment'() {
			const { cib } = await this.parent;
			cib.forEach((item) => {
				expect($(item).css('opacity')).equal('1');
			});
		},

		async 'Все кнопки increment правильно реагируют на клик'() {
			const { cib } = await this.parent;
			cib.forEach((item) => {
				const oldValue = item.previousElementSibling.value;
				item.click();
				const newValue = item.previousElementSibling.value;
				expect(parseInt(newValue, 10)).equal(parseInt(oldValue, 10) + 1);
			});
		},

		async 'Все Коунтеры при (max < value > min) имеет ожидаемые стили кнопок decrement'() {
			const { cdb } = await this.parent;
			cdb.forEach((item) => {
				expect($(item).css('opacity')).equal('1');
			});
		},

		async 'Все Коунтеры при (max < value > min) имеет ожидаемые стили кнопок increment'() {
			const { cib } = await this.parent;
			cib.forEach((item) => {
				expect($(item).css('opacity')).equal('1');
			});
		},

		async 'Все кнопки decrement правильно реагируют на клик'() {
			const { cdb } = await this.parent;
			cdb.forEach((item) => {
				const oldValue = item.nextElementSibling.value;
				item.click();
				const newValue = item.nextElementSibling.value;
				expect(parseInt(newValue, 10)).equal(parseInt(oldValue, 10) - 1);
			});
		},

		async 'Всем Коунтерам уcтановленно значение (value = max)'() {
			const { cib } = await this.parent;
			cib.forEach((item) => {
				const input = item.previousElementSibling;
				const maxValue = input.getAttribute('max');
				input.value = (parseInt(maxValue, 10) - 1).toString();
				item.click();
			});
		},

		async 'Все Коунтеры при (value = max) имеют ожидаемые стили кнопок decrement'() {
			const { cdb } = await this.parent;
			cdb.forEach((item) => {
				expect($(item).css('opacity')).equal('1');
			});
		},

		async 'Все Коунтеры при (value = max) имеют ожидаемые стили кнопок increment'() {
			const { cib } = await this.parent;
			cib.forEach((item) => {
				expect($(item).css('opacity')).equal('0.38');
			});
		},

		async 'Всем Коунтерам уcтановленно значение (value = min)'() {
			const { cdb } = await this.parent;
			cdb.forEach((item) => {
				const input = item.nextElementSibling;
				const minValue = input.getAttribute('min');
				input.value = (parseInt(minValue, 10) + 1).toString();
				item.click();
			});
		},
	}
});

domReady(
	intern.configure({ reporters: ['console'] }),
	intern.run()
);
