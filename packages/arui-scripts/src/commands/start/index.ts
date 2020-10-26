process.env.BROWSERSLIST_CONFIG = process.env.BROWSERSLIST_CONFIG || require.resolve('../../../.browserslistrc');

import fs from 'fs-extra';
import webpack from 'webpack';
import chalk from 'chalk';
import WebpackDevServer from 'webpack-dev-server';
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';
import checkRequiredFiles from '../util/check-required-files';
import configs from '../../configs/app-configs';
import clientConfig from '../../configs/webpack.client.dev';
import serverConfig from '../../configs/webpack.server.dev';
import statsOptions from '../../configs/stats-options';
import devServerConfig from '../../configs/dev-server';

const clientCompiler = webpack(clientConfig);
const serverCompiler = webpack(serverConfig);
const clientDevServer = new WebpackDevServer(clientCompiler, devServerConfig);

serverCompiler.plugin('compile', () => console.log('Compiling server...'));
serverCompiler.plugin('invalid', () => console.log('Compiling server...'));
serverCompiler.plugin('done', (stats) => printCompilerOutput('Server', stats));

clientCompiler.plugin('invalid', () => console.log('Compiling client...'));
clientCompiler.plugin('done', (stats) => printCompilerOutput('Client', stats));


const DEFAULT_PORT = devServerConfig.port;
const HOST = '0.0.0.0';

if (!checkRequiredFiles()) {
    process.exit(1);
}

if (fs.pathExistsSync(configs.serverOutputPath)) {
    fs.removeSync(configs.serverOutputPath);
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `detect()` Promise resolves to the next free port.
choosePort(HOST, DEFAULT_PORT || 0)
    .then((port) => {
        if (!port) {
            // We have not found a port.
            return;
        }
        serverCompiler.watch({ aggregateTimeout: 100 }, () => {});

        clientDevServer.listen(port, HOST, () => {
            console.log(`Client dev server running at http://${HOST}:${port}...`);
        });
    })
    .catch((err) => {
        if (err && err.message) {
            console.log(err.message);
        }
        process.exit(1);
    });


function printCompilerOutput(compilerName: string, stats: any) {
    const output = stats.toString(statsOptions)
        .split('\n')
        .map((line: string) => `${chalk.cyan(`[${compilerName}]`)} ${line}`)
        .join('\n');
    console.log(output);
}

