const $ = require( 'jquery' );

function getDisabled ( element ) {
	return $(element).attr('disabled');
}

function removeDisabled ( element ) {
	const disabled = getDisabled(element);
	if (disabled !== 'disabled') {
		return;
	}
	element.removeAttr('disabled');
}

function setDisabled ( element ) {
	const disabled = getDisabled(element);
	if (disabled === 'disabled') {
		return;
	}
	$(element).attr('disabled', '');
}

module.exports = { getDisabled, removeDisabled, setDisabled };