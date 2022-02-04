// Add extensions as necessary make sure you remember to add the corresponding
// aliases in the webpack config

import $ from 'jquery';
import 'jquery.inputmask';

window.onload = function () {
	$(() => {
		const input = $('.text-field__input.text-field__input_with-mask');
		input.inputmask('dd.mm.yyyy', {
			alias: 'date',
			placeholder: 'ДД.ММ.ГГГГ',
			showMaskOnFocus: false,
			showMaskOnHover: false,
		});
	});
};
