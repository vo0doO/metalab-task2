import $ from 'jquery';

export function getDisabled(element) {
	return $(element).attr('disabled');
}

export function removeDisabled(element) {
	const disabled = getDisabled(element);
	if (disabled !== 'disabled') {
		return;
	}
	element.removeAttr('disabled');
}

export function setDisabled(element) {
	const disabled = getDisabled(element);
	if (disabled === 'disabled') {
		return;
	}
	$(element).attr('disabled', '');
}
