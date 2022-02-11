// Добавляйте расширения по мере необходимости, убедитесь, что вы не забыли добавить соответствующие
// псевдонимы в конфигурации webpack
// import from 'jquery';
// import 'jquery.inputmask';

window.onload = async function () {
	const { default: jQuery } = await import('jquery')
	const $ = jQuery.noConflict()
	const { default: inputmask } = await import('jquery.inputmask')
	$(() => {
		const input = $('.text-field__input.text-field__input_with-mask')
		input.inputmask('dd.mm.yyyy', {
			alias: 'date',
			placeholder: 'ДД.ММ.ГГГГ',
			showMaskOnFocus: false,
			showMaskOnHover: false
		})
	})
}
