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
    'postcss-custom-properties',
    'postcss-strip-units',
    'postcss-calc',
    'postcss-color-function',
    'postcss-nested',
    'autoprefixer',
    'postcss-inherit',
];

const postcssPluginsOptions = {
    'postcss-import': {
        path: [],
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
            '--medium-only': 'screen and (min-width: 48em) and (max-width: 64em)',
            '--large': 'screen and (min-width: 64.0625em)',
            '--large-only': 'screen and (min-width: 64.0625em) and (max-width: 90em)',
            '--xlarge': 'screen and (min-width: 90.0625em)',
            '--xlarge-only': 'screen and (min-width: 90.0625em) and (max-width: 120em)',
            '--xxlarge': 'screen and (min-width: 120.0625em)',
            '--xxlarge-only': 'screen and (min-width: 120.0625em) and (max-width: 99999999em)',
        },
    },
    'postcss-custom-properties': {
        preserve: false,
    },
};

module.exports = { postcssPlugins, postcssPluginsOptions, createPostcssConfig };
