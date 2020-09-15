import path from 'path';
import util from 'util';
import fs from 'fs';
import os from 'os';

const nodeMakeTmpDir = util.promisify(fs.mkdtemp);

/**
 * Создает и возвращает временную папку
 * @returns {Promise<string>}
 */
async function makeTmpDir() {
    return await nodeMakeTmpDir(`${os.tmpdir()}${path.sep}`);
}

export default makeTmpDir;
