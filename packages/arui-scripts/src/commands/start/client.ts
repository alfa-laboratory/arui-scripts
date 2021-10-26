import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server';
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';
import printCompilerOutput from './print-compiler-output';
import clientConfig from '../../configs/webpack.client.dev';
import devServerConfig from '../../configs/dev-server';

const clientCompiler = webpack(clientConfig);
// @ts-ignore
const clientDevServer = new WebpackDevServer(devServerConfig, clientCompiler);

clientCompiler.hooks.invalid.tap('client', () => console.log('Compiling client...'));
clientCompiler.hooks.done.tap('client', (stats: any) => printCompilerOutput('Client', stats));

const DEFAULT_PORT = devServerConfig.port;
const HOST = '0.0.0.0';

choosePort(HOST, +(DEFAULT_PORT || 0))
    .then((port) => {
        if (!port) {
            // We have not found a port.
            return;
        }

        clientDevServer.startCallback(() => {
            console.log(`Client dev server running at http://${HOST}:${port}...`);
        });
    })
    .catch((err) => {
        if (err && err.message) {
            console.log(err.message);
        }

        process.exit(1);
    });
