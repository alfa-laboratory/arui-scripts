import configs from '../configs/app-configs';
import applyOverrides from '../configs/util/apply-overrides';

const chownForAdd = configs.runFromNonRootUser ? '--chown=nginx:nginx' : ''
const nginxNonRootPart = configs.runFromNonRootUser ?
  `RUN mkdir -p /var/lib/nginx && \\
       chown -R nginx:nginx /var/lib/nginx && \\
       chown -R nginx:nginx /var/log/nginx && \\
       chown -R nginx:nginx /etc/nginx/conf.d

   RUN touch /var/run/nginx.pid && \\
       chown -R nginx:nginx /var/run/nginx.pid

   USER nginx`
  : '';

const dockerfileTemplate = `
FROM ${configs.baseDockerImage}
ARG START_SH_LOCATION
ARG NGINX_CONF_LOCATION

${nginxNonRootPart}

WORKDIR /src
ADD ${chownForAdd} $START_SH_LOCATION /src/start.sh
ADD ${chownForAdd} $NGINX_CONF_LOCATION /src/nginx.conf
ADD ${chownForAdd} . /src
`;

export default applyOverrides('Dockerfile', dockerfileTemplate);
