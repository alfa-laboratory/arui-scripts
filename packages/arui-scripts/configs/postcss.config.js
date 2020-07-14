const { componentsTheme } = require('./app-configs');

/**
 * Функция для создания конфигурационного файла postcss
 * @param {String[]} plugins список плагинов
 * @param {Object} options коллекция конфигураций плагинов, где ключ - название плагина, а значение - аргумент для инициализации
 * @returns {*}
 */
function createPostcssConfig(plugins, options) {
    return plugins.map(pluginName => {
        const plugin = require(pluginName);

        if (options.hasOwnProperty(pluginName)) {
            return plugin(options[pluginName]);
        }
        return plugin();
    });
}

const postcssPlugins = [
    'postcss-omit-import-tilde',
    'postcss-import',
    'postcss-url',
    'postcss-mixins',
    'postcss-for',
    'postcss-each',
    'postcss-custom-media',
    '@alfalab/postcss-custom-properties',
    'postcss-strip-units',
    'postcss-calc',
    'postcss-color-function',
    'postcss-nested',
    'autoprefixer',
    'postcss-inherit',
];

const postcssPluginsOptions = {
    'postcss-import': {
        path: ['./src'],
        plugins: [require('postcss-discard-comments')()],
    },
    'postcss-url': {
        url: 'rebase',
    },
    'postcss-custom-media': {
        extensions: {
            '--small': 'screen',
            '--small-only': 'screen and (max-width: 47.9375em)',
            '--medium': 'screen and (min-width: 48em)',
            '--medium-only': 'screen and (min-width: 48em) and (max-width: 63.9375em)',
            '--large': 'screen and (min-width: 64em)',
            '--large-only': 'screen and (min-width: 64em) and (max-width: 89.9375em)',
            '--xlarge': 'screen and (min-width: 90em)',
            '--xlarge-only': 'screen and (min-width: 90em) and (max-width: 119.9375em)',
            '--xxlarge': 'screen and (min-width: 120em)',
            '--xxlarge-only': 'screen and (min-width: 120em) and (max-width: 99999999em)',
            '--mobile-s': 'screen and (min-width: 20em)',
            '--mobile-m': 'screen and (min-width: 23.4375em)',
            '--mobile-l': 'screen and (min-width: 25.75em)',
            '--mobile': 'screen and (max-width: 37.4375em)',
            '--tablet-s': 'screen and (min-width: 37.5em)',
            '--tablet-m': 'screen and (min-width: 48em)',
            '--tablet': 'screen and (min-width: 37.5em) and (max-width: 63.9375em)',
            '--desktop-s': 'screen and (min-width: 64em)',
            '--desktop-m': 'screen and (min-width: 80em)',
            '--desktop-l': 'screen and (min-width: 90em)',
            '--desktop-xl': 'screen and (min-width: 120em)',
            '--desktop': 'screen and (min-width: 64em)'
        },
    },
    '@alfalab/postcss-custom-properties': {
        preserve: false,
        importFrom: componentsTheme
    },
};

module.exports = { postcssPlugins, postcssPluginsOptions, createPostcssConfig };
