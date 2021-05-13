import path from 'path';
import merge from 'lodash.merge';
import { AppConfigs } from './types';
import { getPolyfills } from '../util/get-polyfills';

/**
 * Обновление ключей конфига, зависящих от других. Это нужно делать в самый последний момент
 */
export function calculateDependentConfig(config: AppConfigs) {
    return merge(config, {
        publicPath: `${config.assetsPath}/`,
        serverOutputPath: path.resolve(config.cwd, config.buildPath),
        clientOutputPath: path.resolve(config.cwd, config.buildPath, config.assetsPath),
        clientPolyfillsEntry: getPolyfills(config),
    });
}
