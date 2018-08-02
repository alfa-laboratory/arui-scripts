const configs = require('../../configs/app-configs');

module.exports = `server {
    listen ${configs.clientServerPort};

    location / {
        proxy_pass http://localhost:${configs.serverPort};
    }

    location /${configs.publicPath} {
        expires max;
        add_header Cache-Control public;
        root /src/${configs.buildPath};
    }

    location ~ /${configs.publicPath}.*\\.js$ {
        expires max;
        add_header Cache-Control public;
        root /src/${configs.buildPath};
        types {
            text/javascript  js;
        }
    }
}`;
