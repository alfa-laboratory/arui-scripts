const path = require('path');
const fs = require('fs');

const { cwd } = require('../../configs/app-configs');

// Change project symlink name from @ to #
// From `yarn` developers community @see @link https://github.com/yarnpkg/yarn/issues/5709#issuecomment-426571704):
// Oooh! That totally makes sense - if something starts with an @ we assume
// it's an npm scope, in which case we have to recurse inside to find out the
// actual package folders. So from Yarn point of view, @/sources is a package
// called "sources" from the scope "@".
const symlinkname = '#';
// Symlink dirname
const from = `${cwd}/node_modules`;
// Existing path
const to = path.relative(from, cwd);
// Symlink file
const symlink = `${from}/${symlinkname}`;

function existsAndIsSymlink(path) {
    const exists = fs.existsSync(path);
    if (!exists) {
        throw new Error(`${path} doesn't exist`);
    }
    const stats = fs.lstatSync(path);
    if (stats.isDirectory()) {
        throw new Error(`${path} is an existing directory`);
    }
    else if (stats.isFile()) {
        throw new Error(`${path} is an existing file`);
    }
    else if (!stats.isSymbolicLink()) {
        throw new Error(`${path} is neither a file, directory or symlink, but it exists somehow`);
    }
}

try {
    // Add symlink to the project root folder
    if (!fs.existsSync(symlink)) {
        fs.symlinkSync(to, symlink);
        console.log(`Symlink from ${symlink} to ${to} successfully created`);
    }
    existsAndIsSymlink(symlink);
} catch (err) {
    // Show error message
    console.log(`Error while creating symlink to ${to}\n`, err);
    process.exit(-1);
}
