module.exports = {
    overrides: [
        {
            files: ['*.js', '*.jsx'],
            extends: require.resolve('./packages/eslint-tools/src/.eslintrc.js')
        },
        {
            files: ['*.ts', '*.tsx'],
            extends: require.resolve('./packages/eslint-tools/src/.eslintrc.typescript.js'),
            rules: {
                'no-await-in-loop': 0,
                'no-restricted-syntax': 0,
                'consistent-return': 0,
                'global-require': 0,
                'import/no-dynamic-require': 0,
                'no-param-reassign': 0
            }
        }
    ],
    globals: {
        __resourceQuery: true,
    },
}
