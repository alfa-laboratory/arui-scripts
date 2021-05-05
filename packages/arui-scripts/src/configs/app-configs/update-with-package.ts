import merge from 'lodash.merge';
import { AppConfigs } from './types';
import validateSettingsKeys from './validate-settings-keys';
import { availablePackageSettings } from './available-package-settings';

export function updateWithPackage(config: AppConfigs) {
    const packageSettings = config.appPackage.aruiScripts || {};

    validateSettingsKeys(availablePackageSettings, packageSettings);
    return merge(config, packageSettings);
}
