export function wordOfNum(number, words) {
	const cases = [2, 0, 1, 1, 1, 2];
	return words[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

export const words = {
	mlad: ['младенец', 'младенца', 'младенцев'],
	guests: ['гость', 'гостя', 'гостей'],
	spalni: ['спальня', 'спальни', 'спален'],
	komnati: ['комната', 'комнаты', 'комнат'],
	vanni: ['ванна', 'ванны', 'ванн'],
	krovati: ['кровать', 'кровати', 'кроватей'],
};
