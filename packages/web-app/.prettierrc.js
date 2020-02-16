module.exports = {
    semi: true,
    trailingComma: "all",
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
    arrowParens: "always",
    overrides: [
        {
            files: ["**.css", "**.scss", "**.json"],
            options: {
                tabWidth: 2
            }
        }
    ]
};
