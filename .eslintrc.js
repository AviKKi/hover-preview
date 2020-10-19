module.exports = {
    extends: ["eslint:recommended"],
    env: {
        node: true,
        browser: true,
        es6: true
    },
    parserOptions: {
        "ecmaVersion": 2017
    },
    rules: {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
};