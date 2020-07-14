const path = require('path');
const configs = require('./app-configs');
const applyOverrides = require('./util/apply-overrides');

module.exports = applyOverrides('devServer', {
    stats: false,
    port: configs.clientServerPort,
    hot: true,
    quiet: false,
    inline: true,
    overlay: true,
    publicPath: `/${configs.publicPath}`,
    contentBase: configs.serverOutputPath,
    proxy: Object.assign(configs.appPackage.proxy || {}, {
        '/**': {
            target: `http://localhost:${configs.serverPort}`,
            bypass: (req) => {
                const assetsRoot = path.resolve(`/${configs.publicPath}`);

                if (req.url.startsWith(assetsRoot)) {
                    return req.url;
                }

                return null;
            }
        }
    })
});
