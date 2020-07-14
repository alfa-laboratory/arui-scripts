const shell = require('shelljs');

function exec(...args) {
    return new Promise((resolve, reject) => {
        shell.exec(...args, (code) => {
            if (code === 0) {
                return resolve(code);
            }
            reject(code);
        });
    });

}

module.exports = exec;
