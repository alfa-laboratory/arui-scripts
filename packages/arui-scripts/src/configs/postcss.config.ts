import path from 'path';

import config from './app-configs';

/**
 * Функция для создания конфигурационного файла postcss
 * @param {String[]} plugins список плагинов
 * @param {Object} options коллекция конфигураций плагинов, где ключ - название плагина, а значение - аргумент для инициализации
 * @returns {*}
 */
export function createPostcssConfig(plugins: string[], options: Record<string, unknown>) {
    return plugins.map(pluginName => {
        const plugin = require(pluginName);

        if (options.hasOwnProperty(pluginName)) {
            return plugin(options[pluginName]);
        }
        return plugin();
    });
}

export const postcssPlugins = [
    'postcss-omit-import-tilde',
    'postcss-import',
    'postcss-url',
    'postcss-mixins',
    'postcss-for',
    'postcss-each',
    'postcss-custom-media',
    config.keepCssVars === false && 'postcss-custom-properties',
    'postcss-strip-units',
    'postcss-calc',
    'postcss-color-function',
    'postcss-color-mod-function',
    'postcss-nested',
    'autoprefixer',
    'postcss-inherit',
].filter(Boolean) as string[];

export const postcssPluginsOptions = {
    'postcss-import': {
        path: ['./src'],
        plugins: [require('postcss-discard-comments')()],
    },
    'postcss-url': {
        url: 'rebase',
    },
    'postcss-custom-media': {
        importFrom: path.resolve(__dirname, 'mq.js')
    },
    'postcss-color-mod-function': {
        unresolved: 'warn',
    },
    ...(config.keepCssVars === false && {
        'postcss-custom-properties': {
            preserve: false,
            importFrom: config.componentsTheme,
        }
    }),
};
