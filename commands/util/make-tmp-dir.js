const path = require('path');
const util = require('util');
const fs = require('fs');
const os = require('os');

const nodeMakeTmpDir = util.promisify(fs.mkdtemp);

/**
 * Создает и возвращает временную папку
 * @returns {Promise<string>}
 */
async function makeTmpDir() {
    return await nodeMakeTmpDir(`${os.tmpdir()}${path.sep}`);
}

module.exports = makeTmpDir;
