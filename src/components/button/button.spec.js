async 'Arrow button имеет ожидаемый цвет: загруженный'() {
	const { ab } = await this.parent;
	await expect(ab.c).equal('rgba(31, 32, 65, 0.5)');
},