import configs from '../configs/app-configs';

const nginxTemplate = `client_max_body_size 20m;

server {
    listen ${configs.clientServerPort};
    server_tokens off;

    location / {
        proxy_pass http://127.0.0.1:${configs.serverPort};
    }

    location /${configs.publicPath} {
        expires max;
        add_header Cache-Control public;
        root ${configs.nginxRootPath}/${configs.buildPath};
    }

    location ~ /${configs.publicPath}.*\\.js$ {
        expires max;
        add_header Cache-Control public;
        root ${configs.nginxRootPath}/${configs.buildPath};
        types {
            text/javascript  js;
        }
    }
}`;

export default nginxTemplate;
