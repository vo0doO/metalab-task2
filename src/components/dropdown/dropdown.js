import $ from 'jquery';

function init() {
	const dropdown = $('.dropdown__input');
	const counter = $('.counter');

	dropdown.on('click', (e) => {
		e.preventDefault();
		counter.toggleClass('counter_hidden');
		e.stopPropagation();
	});
}
window.onload = init();
