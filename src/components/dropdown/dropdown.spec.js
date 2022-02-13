const { registerSuite } = intern.getPlugin('interface.object');
const { expect } = intern.getPlugin('chai');
const $ = require('jquery');

registerSuite('components/dropdown', {
	dropdown() {
		const dropdown = document.querySelector('.dropdown__input');
		dropdown.click();
		const ariaExpanded = $(dropdown).attr('aria-expanded');
		expect(ariaExpanded).equal('true');
	}
});

intern.configure({ reporters: 'console' });
intern.run();
