const browsers = require('./supporting-browsers');
const applyOverrides = require('./util/apply-overrides');

module.exports = applyOverrides(['babel', 'babelClient'],{
    presets: [
        [
            require.resolve('babel-preset-env'),
            { modules: false, targets: { browsers }, loose: true }
        ],
        require.resolve('babel-preset-react')
    ],
    plugins: [
        require.resolve('babel-plugin-syntax-dynamic-import'),
        require.resolve('babel-plugin-transform-proto-to-assign'),
        require.resolve('babel-plugin-transform-decorators-legacy'),
        require.resolve('babel-plugin-transform-class-properties'),
        require.resolve('babel-plugin-transform-export-extensions'),
        [require.resolve('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }],
        [require.resolve('babel-plugin-transform-runtime'), { polyfill: false, helpers: false }]
    ],
    env: {
        production: {
            plugins: [
                require.resolve('babel-plugin-transform-react-constant-elements'),
                require.resolve('babel-plugin-transform-react-remove-prop-types'),
                require.resolve('babel-plugin-transform-react-inline-elements')
            ]
        },
        test: {
            plugins: [
                require.resolve('babel-plugin-transform-es2015-modules-commonjs')
            ]
        }
    }
});
