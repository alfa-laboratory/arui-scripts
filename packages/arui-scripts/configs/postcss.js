const path = require('path');

const applyOverrides = require('./util/apply-overrides');
const { postcssPlugins, postcssPluginsOptions, createPostcssConfig } = require('./postcss.config');

module.exports = applyOverrides(
  'postcss',
  createPostcssConfig(postcssPlugins, postcssPluginsOptions)
);
