import type { Configuration as WebpackConfiguration, WebpackOptionsNormalized } from 'webpack';
import type { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import appConfigs from '../app-configs';
import { AppConfigs } from '../app-configs/types';

type Overrides = {
    webpack: WebpackConfiguration;
    webpackClient: WebpackConfiguration;
    webpackDev: WebpackConfiguration;
    webpackClientDev: WebpackConfiguration;
    webpackServer: WebpackConfiguration;
    webpackServerDev: WebpackConfiguration;
    webpackProd: WebpackConfiguration;
    webpackClientProd: WebpackConfiguration;
    webpackServerProd: WebpackConfiguration;
    devServer: WebpackDevServerConfiguration;
    stats: WebpackOptionsNormalized['stats'];

    babel: any; // TODO: где взять typedef-ы для бабеля?
    babelClient: any;
    babelServer: any;

    postcss: any[]; // TODO: где взять typedef-ы для postcss
    browsers: string[];
    supportingBrowsers: string[];

    Dockerfile: string;
    nginx: string;
    'start.sh': string;
};

type OverrideFunction<K extends keyof Overrides> = (config: Overrides[K], appConfig: AppConfigs) => Overrides[K];

export type OverrideFile = {
    [K in keyof Overrides]?: OverrideFunction<K>;
}

let overrides: Array<OverrideFile> = [];

overrides = appConfigs.overridesPath.map(path => {
    try {
        const requireResult = require(path);
        if (requireResult.__esModule) {
            // ts-node импортирует esModules, из них надо вытягивать default именно так
            return requireResult.default;
        }
        return requireResult;
    } catch (e) {
        console.error(`Unable to process override file "${path}"`);
        console.log(e);
        return {};
    }
});

/**
 *
 * @param {String|String[]} overridesKey Ключи оверрайда
 * @param {Object} config Конфиг, к которому нужно применить оверрайды
 * @returns {*}
 */
function applyOverrides<Key extends keyof Overrides>(overridesKey: Key | Key[], config: Overrides[Key]): Overrides[Key] {
    if (typeof overridesKey === 'string') {
        overridesKey = [overridesKey];
    }
    overridesKey.forEach(key => {
        overrides.forEach((override) =>{
            if (override.hasOwnProperty(key)) {
                const overrideFn = override[key];
                if (typeof overrideFn !== 'function') {
                    throw new TypeError(`Override ${key} must be a function`)
                }
                config = overrideFn(config, appConfigs);
            }
        });
    });

    return config;
}

export default applyOverrides;
