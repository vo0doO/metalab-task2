/* eslint-disable object-shorthand */
const { registerSuite } = intern.getPlugin( 'interface.object' );
const { expect } = intern.getPlugin( 'chai' );
import $ from 'jquery';
const { sleep, domReady } = require( '../../utils/js' );

export const buttonTestSuite = registerSuite( 'компонент/arrow-button/дропдаун/', {
	beforeEach () {
		this.ab = $( '.js-button-icon__arrow' );
		this.ab.c = this.ab.css( 'color' );
		return this;
	},
	tests: {
		async 'Arrow button имеет ожидаемый цвет: загруженный' () {
			try {
				const { ab } = await this.parent;
				await expect( ab.c ).equal( 'rgba(31, 32, 65, 0.5)' );
			} catch( error ) {
				throw new Error( "Ошибка в 1 тесте кнопки: " + error );
			}
		},
		async 'Клик 1: Далее кнопка зажата' () {
			try {
				const { ab } = await this.parent;
				await ab.click();
				await sleep( 1000 );
			} catch( error ) {
				throw new Error( "Ошибка в 1 тесте кнопки" + error );
			}
		},
		async 'Arrow button имеет ожидаемый цвет: открытый' () {
			try {
				const { ab } = await this.parent;
				await expect( ab.c ).equal( 'rgba(31, 32, 65, 0.75)' );
			} catch( error ) {
				throw new Error( "Ошибка в 1 тесте кнопки" + error );
			}
		},
		async 'Клик 2: Далее кнопка отжата' () {
			try {
				const { ab } = await this.parent;
				await ab.click();
				await sleep( 1000 );
			} catch( error ) {
				throw new Error( "Ошибка в 1 тесте кнопки" + error );
			}
		},
		async 'Arrow button имеет ожидаемый цвет: закрытый' () {
			try {
				const { ab } = await this.parent;
				await expect( ab.c ).equal( 'rgba(31, 32, 65, 0.5)' );
			} catch( error ) {
				throw new Error( "Ошибка в 1 тесте кнопки" + error );
			}
		},
	}
} );

domReady(
	intern.configure( {
		reporters: ['console'],
		functionalCoverage: true,
		benchmark: true,
		bail: true,
		filterErrorStack: true,
	} ),
	intern.run()
);
