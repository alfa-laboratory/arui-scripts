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
                const assetsPath = path.resolve(`/${configs.publicPath}`);
                const urlStart = req.url.substr(0, assetsPath.length);

                if (urlStart === assetsPath) {
                    return req.url;
                }

                return false;
            }
        }
    })
});
