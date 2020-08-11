// ts-node don't want to load configuration from tsconfig, so we wi will reuse this config
require('ts-node').register({
    compilerOptions: {
        module: 'CommonJS',
        target: 'ES2016',
        skipLibCheck: true
    }
});
