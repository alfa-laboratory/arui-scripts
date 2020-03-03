const appConfigs = require('../app-configs');
let overrides = {};

if (appConfigs.hasOverrides) {
  overrides = require(appConfigs.overridesPath);
}

/**
 *
 * @param {String|String[]} overridesKey Ключи оверрайда
 * @param {Object} config Конфиг, к которому нужно применить оверрайды
 * @returns {*}
 */
function applyOverrides(overridesKey, config) {
  if (typeof overridesKey === 'string') {
    overridesKey = [overridesKey];
  }
  overridesKey.forEach(key => {
    if (overrides.hasOwnProperty(key)) {
      if (typeof overrides[key] !== 'function') {
        console.error(`Override ${key} must be a function`);
      }
      config = overrides[key](config);
    }
  });

  return config;
}

module.exports = applyOverrides;
