require('ts-node').register({
    compilerOptions: {
        "module": "CommonJS",
        "target": "ES2016"
    }
});
const babelJest = require('babel-jest');
const babelPresets = require('../babel-server');

module.exports = babelJest.createTransformer(babelPresets.default);
