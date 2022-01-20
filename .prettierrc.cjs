// @ts-check
/// <reference types="@prettier/plugin-pug/src/prettier" />

/**
 * @type {import('prettier').Options}
 */
module.exports = {
	// `require.resolve` is needed for e.g. `pnpm`
	
	plugins: ['prettier-plugin-pug'],
	
	printWidth: 120,
	useTabs: true,
	pugTabWidth: 2,
	singleQuote: true,
	// ... more pug* options
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
