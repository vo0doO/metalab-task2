/* eslint-disable func-names */
const { registerSuite } = intern.getPlugin('interface.object');
const { expect } = intern.getPlugin('chai');
import $ from 'jquery';
const { sleep, domReady } = require( '../../utils/js' );

export const dropdownTestSuite = registerSuite( 'компонент/дропдаун', {
    beforeEach() {
        const dropdown = $( '.js-dropdown__input' );
        this.dd = dropdown;
        this.dd.br = this.dd.css( 'border-radius' );
        this.dd.ae = this.dd.attr( 'aria-expanded' );
        this.dl = $( '.js-dropdown__items' );
        return this;
    },
    tests: {
        'Dropdown имеет ожидаемые классы: загруженный': async function () {
            const { dd } = this.parent;
            expect( dd.hasClass( 'js-dropdown__input_opened' ) ).equal( false );
        },

        'Aria expanded имеет значение false: загруженный': async function () {
            const { dd } = this.parent;
            expect( dd.ae ).equal( 'false' );
        },

        'Border radius соответствует ожиданиям: загруженный': async function () {
            const { dd } = this.parent;
            expect( dd.br ).equal( '4px' );
        },

        'Border сolor имеет ожидаемый цвет: загруженный': async function () {
            const bc = $( '.js-dropdown__input' ).css( 'border-color' );
            expect( bc ).equal( 'rgba(31, 32, 65, 0.25)' );
        },

        'Первый клик: Далее dropdown открыт': async function () {
            try {
                const { dd } = this.parent;
                await dd.click();
                await sleep( 1000 );
            } catch( error ) {
                throw new Error( "Ошибка в 1 тесте кнопки: " + error );

            }
        },

        'Dropdown имеет ожидаемые классы: открытый': async function () {
            const { dd } = this.parent;
            expect( dd.hasClass( 'js-dropdown__input_opened' ) ).equal( true );
        },

        'Aria expanded имеет значение true: открытый': async function () {
            const { dd } = this.parent;
            expect( dd.ae ).equal( 'true' );
        },

        'Border radius соответствует ожиданиям: открытый': async function () {
            const { dd } = this.parent;
            expect( dd.br ).equal( '4px 4px 0px 0px' );
        },

        'Border сolor имеет ожидаемый цвет: открытый': async function () {
            const bc = $( '.js-dropdown__input.js-dropdown__input_opened' ).css( 'border-color' );
            expect( bc ).equal( 'rgba(31, 32, 65, 0.5)' );
        },

        'Второй клик: Далее dropdown открыт': async function () {
            try {
                const { dd } = this.parent;
                await dd.click();
                await sleep( 1000 );
            } catch( error ) {
                throw new Error( 'Ошибка -> Второго клика dropdown' );
            }
        },

        'Dropdown имеет ожидаемые классы: закрытый': async function () {
            const { dd } = this.parent;
            expect( dd.hasClass( 'js-dropdown__input_opened' ) ).equal( false );
        },

        'Aria expanded имеет значение false: закрытый': async function () {
            const { dd } = this.parent;
            expect( dd.ae ).equal( 'false' );
        },

        'Border radius соответствует ожиданиям: закрытый': async function () {
            const { dd } = this.parent;
            expect( dd.br ).equal( '4px' );
        },

        'Border сolor имеет ожидаемый цвет: закрытый': async function () {
            const bc = $( '.js-dropdown__input' ).css( 'border-color' );
            expect( bc ).equal( 'rgba(31, 32, 65, 0.25)' );
        },
    }
});

domReady(
    intern.configure( { reporters: ['console'] } ),
    intern.run()
);
