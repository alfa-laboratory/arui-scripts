/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */
const chalk = require('chalk');
const printBuildError = require('react-dev-utils/printBuildError');
const build = require('./build-wrapper');
const { calculateAssetsSizes, printAssetsSizes } = require('../util/client-assets-sizes');
const config = require('../../configs/webpack.client.prod');

console.log(chalk.magenta('Building client...'));

build(config)
    .then(({ stats, warnings }) => {
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

        const sizes = calculateAssetsSizes(stats, config.output.path);
        printAssetsSizes(sizes);
    })
    .catch((err) => {
        console.log(chalk.red('Failed to compile client.\n'));
        printBuildError(err);
        process.exit(1);
    });
