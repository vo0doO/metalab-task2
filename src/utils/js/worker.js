onmessage = async function (e) {
	console.log('Рабочий: сообщение полученно от основного скрипта');

	const data = e.data;

	if (isNaN(data)) {
		postMessage('Please write two numbers');
	} else {
		const workerResult = 'Result: ' + data;
		console.log(`Worker: Posting message back to main script with result ${workerResult}`);
	}
};
onerror = function (e) {
	try {
		console.log('Try ', e);
		postMessage('Error ' + e);
	} catch (error) {
		console.log('Error', error);
	}
};
