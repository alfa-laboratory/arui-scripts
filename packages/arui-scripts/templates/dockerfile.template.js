const configs = require('../configs/app-configs');

const nginxNonRootPart = configs.runFromNonRootUser ?
  `RUN chown -R nginx:nginx /src && chmod -R 755 /src && \\
       chown -R nginx:nginx /var/lib/nginx && \\
       chown -R nginx:nginx /var/log/nginx && \\
       chown -R nginx:nginx /etc/nginx/conf.d

   RUN touch /var/run/nginx.pid && \\
       chown -R nginx:nginx /var/run/nginx.pid

   USER nginx`
  : '';

module.exports = `
FROM ${configs.baseDockerImage}
ARG START_SH_LOCATION
ARG NGINX_CONF_LOCATION

WORKDIR /src
ADD $START_SH_LOCATION /src/start.sh
ADD $NGINX_CONF_LOCATION /src/nginx.conf
ADD . /src

${nginxNonRootPart}
`;
