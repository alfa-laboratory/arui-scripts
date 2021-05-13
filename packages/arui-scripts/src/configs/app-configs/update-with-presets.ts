import merge from 'lodash.merge';
import { AppConfigs } from './types';
import { tryResolve } from '../util/try-resolve';
import validateSettingsKeys from './validate-settings-keys';
import { availablePackageSettings } from './available-package-settings';

export function updateWithPresets(config: AppConfigs) {
    const packageSettings = config.appPackage.aruiScripts || {};
    if (!packageSettings.presets) {
        return config;
    }

    const presetsConfigPath = tryResolve(
        `${packageSettings.presets}/arui-scripts.config.js`,
        { paths: [config.cwd] }
    );
    const presetsOverridesPath = tryResolve(
        `${packageSettings.presets}/arui-scripts.overrides.js`,
        { paths: [config.cwd] }
    );
    if (presetsConfigPath) {
        const presetsSettings = require(presetsConfigPath);

        validateSettingsKeys(availablePackageSettings, presetsSettings);
        config = merge(config, presetsSettings);
    }
    if (presetsOverridesPath) {
        config.overridesPath.unshift(presetsOverridesPath);
    }

    delete packageSettings.presets;
    return config;
}
