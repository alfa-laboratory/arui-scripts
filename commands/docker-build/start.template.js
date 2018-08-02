const configs = require('../../configs/app-configs');

module.exports = `#!/bin/sh

# Start the nginx process in background
nginx &

# Start nodejs process
node ./${configs.buildPath}/${configs.serverOutput}
`;