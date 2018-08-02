// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.BROWSERSLIST_CONFIG = process.env.BROWSERSLIST_CONFIG || require.resolve('../../configs/.browserslistrc');

/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */
const { spawn } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const checkRequiredFiles = require('../util/check-required-files');
const configs = require('../../configs/app-configs');

if (!checkRequiredFiles()) {
    process.exit(1);
}

if (fs.pathExistsSync(configs.serverOutputPath)) {
    fs.removeSync(configs.serverOutputPath);
}

const compileServer = spawn('node', [path.join(__dirname, './server')], { stdio: 'inherit' });
const compileClient = spawn('node', [path.join(__dirname, './client')], { stdio: 'inherit' });

const onProcessExit = (code) => {
    if (code !== 0) {
        compileServer.kill();
        compileClient.kill();
        process.exit(code);
    }
};


compileServer.on('close', onProcessExit);
compileClient.on('close', onProcessExit);
