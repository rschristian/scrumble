module.exports =  {
    parser:  '@typescript-eslint/parser',
    extends:  [
        'preact',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    settings: {
        react: {
            pragma: 'h',
            version: 'detect'
        },
    },
    parserOptions:  {
        ecmaVersion:  2018,
        sourceType:  'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    ignorePatterns: ['build/'],
    rules:  {
        'indent': ['warn', 4, { "SwitchCase": 1, "ignoredNodes": ["TemplateLiteral > *"] }],
        'react/jsx-indent': ['warn', 4],
        'react/jsx-indent-props': ['warn', 4],
        'react/no-unknown-property': ['error', { ignore: ['class'] }],
        'react/no-unescaped-entities': ['warn'],
        'quotes': 'off',
        '@typescript-eslint/quotes': ['warn', 'single'],
        '@typescript-eslint/no-use-before-define': ['off'],
        'arrow-parens': 'warn',
        '@typescript-eslint/ban-ts-ignore': ['warn'],
        '@typescript-eslint/interface-name-prefix': 'off',
        'semi': 'off',
        '@typescript-eslint/semi': ['warn'],
    },
    overrides: [
        {
            files: ["*.js"],
            rules: {
                "@typescript-eslint/explicit-function-return-type": "off",
            }
        }
    ]
};
