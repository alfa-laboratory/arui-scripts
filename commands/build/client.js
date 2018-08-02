/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */
const chalk = require('chalk');
const printBuildError = require('react-dev-utils/printBuildError');
const { printFileSizesAfterBuild, measureFileSizesBeforeBuild } = require('react-dev-utils/FileSizeReporter');
const build = require('./build-wrapper');

const config = require('../../configs/webpack.client.prod');

// These sizes are pretty large. We'll warn for bundles exceeding them.
const WARN_AFTER_BUNDLE_GZIP_SIZE = 512 * 1024;
const WARN_AFTER_CHUNK_GZIP_SIZE = 1024 * 1024;

console.log('Building client...');

measureFileSizesBeforeBuild(config.output.path)
    .then(previousFileSizes => build(config, previousFileSizes))
    .then(({ stats, warnings, previousFileSizes }) => {
        printFileSizesAfterBuild(
            stats,
            previousFileSizes,
            config.output.path,
            WARN_AFTER_BUNDLE_GZIP_SIZE,
            WARN_AFTER_CHUNK_GZIP_SIZE
        );

        if (warnings.length) {
            console.log(chalk.yellow('Client compiled with warnings.\n'));
            console.log(warnings.join('\n\n'));
            console.log(
                `Search for the ${chalk.underline(chalk.yellow('keywords'))} to learn more about each warning.`
            );
            console.log(
                `To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.`
            );
        } else {
            console.log(chalk.green('Client compiled successfully.\n'));
        }
    })
    .catch((err) => {
        console.log(chalk.red('Failed to compile client.\n'));
        printBuildError(err);
        process.exit(1);
    });
