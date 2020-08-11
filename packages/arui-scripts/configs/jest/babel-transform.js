require('../../commands/util/register-ts-node');

const babelJest = require('babel-jest');
const babelPresets = require('../babel-server');

module.exports = babelJest.createTransformer(babelPresets.default);
