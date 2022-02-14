/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
async function domReady(fn1, fn2) {
	try {
		document.addEventListener('readystatechange', (event) => {
			if (event.target.readyState === 'interactive') {
				fn1;
			} else if (event.target.readyState === 'complete') {
				fn2;
			}
		});
	} catch (error) {
		throw new Error('Document not loaded');
	}
}

export { domReady };
