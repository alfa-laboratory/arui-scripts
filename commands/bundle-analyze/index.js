const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const makeTmpDir = require('../util/make-tmp-dir');
const clientConfig = require('../../configs/webpack.client.prod');

(async () => {
    const tmpDir = await makeTmpDir();
    clientConfig.plugins.push(new BundleAnalyzerPlugin());
    clientConfig.output.path = tmpDir;
    webpack(clientConfig).run();
})();


