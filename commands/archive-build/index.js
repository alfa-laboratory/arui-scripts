const shell = require('shelljs');
const tar = require('tar');
const configs = require('../../configs/app-configs');
const exec = require('../util/exec');

(async () => {
    try {
        console.time('Total time');

        console.time('Build application time');
        // run build script
        await exec('npm run build');

        console.timeEnd('Build application time');

        console.time('Remove build dependencies time');
        // if yarn is available prune dev dependencies with yarn, otherwise use npm
        if (configs.useYarn && shell.which('yarn')) {
            await exec('yarn install --production --ignore-optional --frozen-lockfile --ignore-scripts --prefer-offline');
        } else {
            await exec('npm prune --production');
        }

        console.timeEnd('Remove build dependencies time');

        console.time('Archive build time');
        await tar.c(
            { file: configs.archiveName },
            [configs.buildPath, ...configs.additionalBuildPath, 'node_modules', 'package.json']
        );

        console.timeEnd('Archive build time');

        console.timeEnd('Total time');
    } catch (err) {
        console.error('Error during archive-build.');
        if (configs.debug) {
            console.error(err);
        }
        process.exit(1);
    }
})();
