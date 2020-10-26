/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */
import chalk from 'chalk';
import printBuildError from 'react-dev-utils/printBuildError';
import { Configuration } from 'webpack';
import build from './build-wrapper';
import { calculateAssetsSizes, printAssetsSizes } from '../util/client-assets-sizes';
import config from '../../configs/webpack.client.prod';

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

        function printOutputSizes(webpackConfig: Configuration) {
            const sizes = calculateAssetsSizes(stats, webpackConfig?.output?.path);
            printAssetsSizes(sizes);
        }

        if (Array.isArray(config)) {
            config.forEach(printOutputSizes)
        } else {
            printOutputSizes(config);
        }
    })
    .catch((err) => {
        console.log(chalk.red('Failed to compile client.\n'));
        printBuildError(err);
        process.exit(1);
    });
