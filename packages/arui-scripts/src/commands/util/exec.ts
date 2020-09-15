import shell from 'shelljs';

function exec(command: string) {
    return new Promise((resolve, reject) => {
        shell.exec(command, (code) => {
            if (code === 0) {
                return resolve(code);
            }
            reject(code);
        });
    });

}

export default exec;
