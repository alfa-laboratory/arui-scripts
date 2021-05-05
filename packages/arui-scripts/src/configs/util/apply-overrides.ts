import appConfigs from '../app-configs';

type OverrideFile = Record<string, (config: any) => any>;

let overrides: Array<OverrideFile> = [];

overrides = appConfigs.overridesPath.map(path => {
    try {
        return require(path)
    } catch (e) {
        return {};
    }
});

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
        overrides.forEach((override) =>{
            if (override.hasOwnProperty(key)) {
                if (typeof override[key] !== 'function') {
                    console.error(`Override ${key} must be a function`);
                }
                config = override[key](config);
            }
        });
    });

    return config;
}

export default applyOverrides;
