import appConfigs from '../app-configs';

let overrides: Record<string, (config: any) => any> = {};

if (appConfigs.hasOverrides) {
    overrides = require(appConfigs.overridesPath);
}

/**
 *
 * @param {String|String[]} overridesKey Ключи оверрайда
 * @param {Object} config Конфиг, к которому нужно применить оверрайды
 * @returns {*}
 */
function applyOverrides<T = any>(overridesKey: string | string[], config: T): T {
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

export default applyOverrides;
