import path from 'path';
// @ts-ignore
import { Configuration } from 'webpack-dev-server';
import configs from './app-configs';
import applyOverrides from './util/apply-overrides';
import http from "http";

const devServerConfig = applyOverrides<Configuration>('devServer', {
    // stats: false, //the stats option was removed, please use the stats option from webpack.config.js
    port: configs.clientServerPort,
    // hot: true, // the hot option is true by default 
    // quiet: false,
    overlay: true,
    dev: {
        publicPath: `/${configs.publicPath}`,
    },
    static: [{
        // publicPath: `/${configs.publicPath}`,
        publicPath: configs.serverOutputPath,
    }],
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
