/* eslint-disable object-shorthand */
const { registerSuite } = intern.getPlugin('interface.object');
const { expect } = intern.getPlugin('chai');
const $ = require('jquery');
const { sleep, domReady } = require('../../utils/js');

registerSuite('компонент/arrow-button/дропдаун/', {
	beforeEach() {
		this.ab = $('.js-icon-button__arrow');
		this.ab.c = this.ab.css('color');
		return this;
	},
	tests: {
		async 'Arrow button имеет ожидаемый цвет: загруженный'() {
			const { ab } = await this.parent;
			await expect(ab.c).equal('rgba(31, 32, 65, 0.5)');
		},
	async 'Клик: Далее кнопка зажата'() {
		const { ab } = await this.parent;
		await ab.click();
		await sleep(1000);
	},
	async 'Arrow button имеет ожидаемый цвет: открытый'() {
		const { ab } = await this.parent;
		await expect(ab.c).equal('rgba(31, 32, 65, 0.75)');
	},
	async 'Клик: Далее кнопка отжата'() {
		const { ab } = await this.parent;
		await ab.click();
		await sleep(1000);
	},
	async 'Arrow button имеет ожидаемый цвет: закрытый'() {
		const { ab } = await this.parent;
		await expect(ab.c).equal('rgba(31, 32, 65, 0.5)');
	},
}});

domReady(
	intern.configure({ reporters: ['console'] }),
	intern.run()
);
