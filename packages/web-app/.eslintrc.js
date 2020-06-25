module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'preact',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    settings: {
        react: {
            pragma: 'h',
            version: 'detect',
        },
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'react/no-unknown-property': ['error', { ignore: ['class'] }],
        '@typescript-eslint/quotes': ['warn', 'single'],
        '@typescript-eslint/interface-name-prefix': 'off',
        'no-console': 'warn',
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
