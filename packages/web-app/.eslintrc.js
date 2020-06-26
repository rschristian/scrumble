module.exports = {
    plugins: ['@typescript-eslint'],
    extends: [
        'preact',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        react: {
            pragma: 'h',
            version: 'detect',
        },
    },
    rules: {
        'react/no-unknown-property': ['error', { ignore: ['class'] }],
        '@typescript-eslint/quotes': ['warn', 'single'],
        '@typescript-eslint/interface-name-prefix': 'off',
        'no-console': 'warn',
        eqeqeq: ['warn'],
    },
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off',
            },
        },
    ],
};
