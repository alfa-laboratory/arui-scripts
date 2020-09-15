import configs from '../configs/app-configs';

const startTemplate = `#!/bin/sh

# Move nginx config
mv ./nginx.conf /etc/nginx/conf.d/default.conf

# Start the nginx process in background
nginx &

# Start nodejs process
node ./${configs.buildPath}/${configs.serverOutput}
`;

export default startTemplate;
