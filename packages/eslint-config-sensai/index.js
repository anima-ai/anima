module.exports = {
	extends: [
		'next/core-web-vitals',
		'next',
		'@callstack/eslint-config/react',
		'plugin:valtio/recommended',
	],
	plugins: ['react-hooks', 'unused-imports'],
	rules: {
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'lf',
				printWidth: 80,
				singleQuote: true,
				trailingComma: 'all',
				useTabs: true,
				tabWidth: 2,
				semi: true,
				bracketSpacing: true,
				arrowParens: 'avoid',
			},
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'@next/next/no-html-link-for-pages': 'off',
		'react/react-in-jsx-scope': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/no-unresolved': 'off',
		'no-unused-vars': 'off',
		'promise/always-return': 'off',
		'promise/prefer-await-to-then': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/prefer-optional-chain': 'off',
		'no-prototype-builtins': 'off',
		'unused-imports/no-unused-imports': [
			'error',
			{
				vars: 'all',
				argsIgnorePattern: '^_',
				varsIgnorePattern: '^_',
				args: 'after-used',

				caughtErrorsIgnorePattern: '^_',
			},
		],
	},
};
