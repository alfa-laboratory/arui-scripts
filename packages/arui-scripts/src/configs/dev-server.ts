import path from 'path';
import { Configuration } from 'webpack-dev-server';
import configs from './app-configs';
import applyOverrides from './util/apply-overrides';
import http from "http";

const devServerConfig = applyOverrides<Configuration>('devServer', {
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
            bypass: (req: http.IncomingMessage) => {
                const assetsRoot = path.normalize(`/${configs.publicPath}`).replace(/\\/g, '/');

                if (req?.url?.startsWith(assetsRoot)) {
                    return req.url;
                }

                return null;
            }
        }
    })
});

export default devServerConfig;
