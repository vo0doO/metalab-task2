// @ts-check
/// <reference types="@prettier/plugin-pug/src/prettier" />

/**
	* @type {import('prettier').Options}
	*/
module.exports = {
	plugins: [ require.resolve('@prettier/plugin-pug') ],
	singleQuote: 'true',
	pugPrintWidth: 80,
	pugUseTabs: 'true',
	pugSemi: 'true',
	pugBracketSpacing: 'true',
	pugTabWidth: 2,
	pugSingleQuote: 'true',
	pugAttributeSeparator: 'none',
	pugSortAttributes: 'asc',
	pugWrapAttributesThreshold: 3,
	pugEmptyAttributes: 'all',
	pugArrowParens: 'always',
	pugClassNotation: 'literal',
	pugIdNotation: 'literal',
	pugClassLocation: 'before-attributes',
	pugExplicitDiv: false,
	overrides: [
		{
			/** Sass-specific configuration. */
			files: '*.scss',
			options: {
				singleQuote: true,
			},
		},
	],
}
