/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */
const chalk = require('chalk');
const printBuildError = require('react-dev-utils/printBuildError');
const build = require('./build-wrapper');

const config = require('../../configs/webpack.server.prod');

console.log('Building server...');
build(config)
    .then(({ warnings }) => {
        if (warnings.length) {
            console.log(chalk.yellow('Server compiled with warnings.\n'));
            console.log(warnings.join('\n\n'));
            console.log(
                `Search for the ${chalk.underline(chalk.yellow('keywords'))} to learn more about each warning.`
            );
            console.log(
                `To ignore, add ${chalk.cyan('// eslint-disable-next-line')} to the line before.`
            );
        } else {
            console.log(chalk.green('Server compiled successfully.\n'));
        }
    })
    .catch((err) => {
        console.log(chalk.red('Failed to compile server.\n'));
        printBuildError(err);
        process.exit(1);
    });
