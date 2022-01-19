// @ts-check
/// <reference types="@prettier/plugin-pug/src/prettier" />

/**
 * @type {import('prettier').Options}
 */
module.exports = {
	// `require.resolve` is needed for e.g. `pnpm`
	
	plugins: ['prettier-plugin-pug'],
	
	printWidth: 160,
	useTabs: true,
	pugTabWidth: 2,
	// singleQuote: true,
	// ... more pug* options
	attributeSeparator: 'always',
	sortAttributes: 'desc',
	wrapAttributesThreshold: 12,
	emptyAttributes: 'all',
	arrowParens: 'always',
	classNotation: 'attribute',
	// pugIdNotation: 'literal',
	pugClassLocation: 'after-attributes',
	pugExplicitDiv: false
}
