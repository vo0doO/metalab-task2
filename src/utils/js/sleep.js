/* eslint-disable import/prefer-default-export */
/* eslint-disable no-promise-executor-return */
async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export { sleep };
