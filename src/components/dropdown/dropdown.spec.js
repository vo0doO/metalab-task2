const { registerSuite } = intern.getPlugin('interface.object');
const { expect } = intern.getPlugin('chai');
const $ = require('jquery');

const {sleep, domReady} = require('../../utils/js');
registerSuite('компонент/дропдаун', {
    beforeEach() {
        const dropdown = $('.js-dropdown__input');
        this.dd = dropdown;
        this.dd.br = this.dd.css('border-radius');
        this.dd.ae = this.dd.attr('aria-expanded');
        this.dl = $('.js-dropdown__items');
        return this;
    },
    tests: {
        async 'Dropdown имеет ожидаемые классы: загруженный'() {
            const {dd} = await this.parent;
            await expect(dd.hasClass('js-dropdown__input_opened')).equal(false);
        },

        async 'Aria expanded имеет значение false: загруженный'() {
            const {dd} = await this.parent;
            await expect(dd.ae).equal('false');
        },

        async 'Border radius соответствует ожиданиям: загруженный'() {
            const {dd} = await this.parent;
            await expect(dd.br).equal('4px');
        },

        async 'Border сolor имеет ожидаемый цвет: загруженный'() {
            const bc = $('.js-dropdown__input').css('border-color');
            await expect(bc).equal('rgba(31, 32, 65, 0.25)');
        },

        async 'Первый клик: Далее dropdown открыт'() {
            const {dd} = await this.parent;
            await dd.click();
            await sleep(1000);
        },

        async 'Dropdown имеет ожидаемые классы: открытый'() {
            const {dd} = await this.parent;
            await expect(dd.hasClass('js-dropdown__input_opened')).equal(true);
        },

        async 'Aria expanded имеет значение true: открытый'() {
            const {dd} = await this.parent;
            await expect(dd.ae).equal('true');
        },

        async 'Border radius соответствует ожиданиям: открытый'() {
            const {dd} = await this.parent;
            await expect(dd.br).equal('4px 4px 0px 0px');
        },

        async 'Border сolor имеет ожидаемый цвет: открытый'() {
            const bc = $('.js-dropdown__input.js-dropdown__input_opened').css('border-color');
            await expect(bc).equal('rgba(31, 32, 65, 0.5)');
        },

        async 'Второй клик: Далее dropdown открыт'() {
            const {dd} = await this.parent;
            await dd.click();
            await sleep(1000);
        },


        async 'Dropdown имеет ожидаемые классы: закрытый'() {
            const {dd} = await this.parent;
            await expect(dd.hasClass('js-dropdown__input_opened')).equal(false);
        },

        async 'Aria expanded имеет значение false: закрытый'() {
            const {dd} = await this.parent;
            await expect(dd.ae).equal('false');
        },

        async 'Border radius соответствует ожиданиям: закрытый'() {
            const {dd} = await this.parent;
            await expect(dd.br).equal('4px');
        },

        async 'Border сolor имеет ожидаемый цвет: закрытый'() {
            const bc = $('.js-dropdown__input').css('border-color');
            await expect(bc).equal('rgba(31, 32, 65, 0.25)');
        },
    }
});

domReady(intern.configure({
    reporters: ['console']
}), intern.run());
