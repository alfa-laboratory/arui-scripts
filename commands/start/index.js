process.env.BROWSERSLIST_CONFIG = process.env.BROWSERSLIST_CONFIG || require.resolve('../../configs/.browserslistrc');

const fs = require('fs-extra');
const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const { choosePort } = require('react-dev-utils/WebpackDevServerUtils');
const checkRequiredFiles = require('../util/check-required-files');
const configs = require('../../configs/app-configs');
const clientConfig = require('../../configs/webpack.client.dev');
const serverConfig = require('../../configs/webpack.server.dev');
const statsOptions = require('../../configs/stats-options');
const devServerConfig = require('../../configs/dev-server');

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
choosePort(HOST, DEFAULT_PORT)
    .then((port) => {
        if (!port) {
            // We have not found a port.
            return;
        }
        serverCompiler.watch(100, () => {});

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


function printCompilerOutput(compilerName, stats) {
    const output = stats.toString(statsOptions)
        .split('\n')
        .map(line => `${chalk.cyan(`[${compilerName}]`)} ${line}`)
        .join('\n');
    console.log(output);
}

