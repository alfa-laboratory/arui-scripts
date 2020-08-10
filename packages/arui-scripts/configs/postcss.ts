import applyOverrides from './util/apply-overrides';

const { postcssPlugins, postcssPluginsOptions, createPostcssConfig } = require('./postcss.config');

const postcssConfig = applyOverrides(
  'postcss',
  createPostcssConfig(postcssPlugins, postcssPluginsOptions)
);

export default postcssConfig;
