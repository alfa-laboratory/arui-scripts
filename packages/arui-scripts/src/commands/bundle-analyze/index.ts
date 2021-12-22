import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import makeTmpDir from '../util/make-tmp-dir';
import clientConfig from '../../configs/webpack.client.prod';
import config from '../../configs/app-configs';

(async () => {
    const tmpDir = await makeTmpDir();
    const plugin = new BundleAnalyzerPlugin({
        generateStatsFile: true,
        statsFilename: config.statsOutputPath,
    });
    clientConfig.plugins?.push(plugin as unknown as webpack.WebpackPluginInstance);
    clientConfig!.output!.path = tmpDir;
    webpack(clientConfig).run(() => {});
})();


