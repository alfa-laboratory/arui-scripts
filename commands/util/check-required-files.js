const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const configs = require('../../configs/app-configs');

const extensions = ['ts', 'tsx', 'js', 'jsx'];

const files = [
    configs.serverEntry,
    configs.clientEntry,
    configs.clientPolyfillsEntry
];

function checkFileWithExtensions(filePath, extensions) {
    if (extensions.some(ext => filePath.endsWith(`.${ext}`))) {
        try {
            fs.accessSync(filePath);
            return true;
        }
        catch (err) {}
    }

    for (let i = 0; i < extensions.length; i++) {
        try {
            fs.accessSync(`${filePath}.${extensions[i]}`);
            return true;
        }
        catch (err) {}
    }

    return false;
}

function checkRequiredFiles() {
    const unavailableFiles = files
        .map(filePath => {
            return {
                exist: checkFileWithExtensions(filePath, extensions),
                path: filePath
            };
        })
        .filter(fileInfo => !fileInfo.exist);

    if (unavailableFiles.length !== 0) {
        console.log(chalk.red('Could not find required files.'));
        const extensionsString = extensions.join(',');
        unavailableFiles.forEach(fileInfo => {
            const dirName = path.dirname(fileInfo.path);
            const fileName = path.basename(fileInfo.path);
            console.log(chalk.red('  Name: ') + chalk.cyan(`${fileName}.{${extensionsString}}`));
            console.log(chalk.red('  Searched in: ') + chalk.cyan(dirName));
        });
        return false;
    }

    return true;
}


module.exports = checkRequiredFiles;