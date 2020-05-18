const { appPackage } = require('../app-configs');

const THEME_KEY = 'сomponentsTheme';

/**
 * Собирает конфиг для postcss-custom-properties.
 * В случае наличия темы с css-переменными - импортирует ее.
 * @returns {Object}
 */
function setupPostcssCustomProperties() {
    const config = {
        preserve: false
    };

    if (THEME_KEY in appPackage) {
        config.importFrom = appPackage[THEME_KEY];
    }

    return config;
}

module.exports = setupPostcssCustomProperties;
