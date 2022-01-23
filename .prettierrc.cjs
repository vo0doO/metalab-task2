// @ts-check
/// <reference types="@prettier/plugin-pug/src/prettier" />

/**
	* @type {import('prettier').Options}
	*/
module.exports = {
		plugins: [ 'prettier-plugin-pug' ],
		printWidth: 120,
		useTabs: true,
		pugTabWidth: 2,
		singleQuote: true,
		pugSingleQuote: 'true',
		pugAttributeSeparator: 'none',
		pugSortAttributes: 'desc',
		pugWrapAttributesThreshold: 4,
		pugEmptyAttributes: 'all',
		pugArrowParens: 'always',
		pugClassNotation: 'literal',
		pugIdNotation: 'literal',
		pugClassLocation: 'before-attributes',
		pugExplicitDiv: false
}
