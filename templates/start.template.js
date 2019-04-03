const configs = require('../configs/app-configs');

module.exports = `#!/bin/sh

# Move nginx config
mv ./nginx.conf /etc/nginx/conf.d/default.conf

# Start the nginx process in background
nginx &

# Start nodejs process
node ./${configs.buildPath}/${configs.serverOutput}
`;
