import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import makeTmpDir from '../util/make-tmp-dir';
import clientConfig from '../../configs/webpack.client.prod';

(async () => {
    const tmpDir = await makeTmpDir();
    clientConfig?.plugins?.push((new BundleAnalyzerPlugin()) as unknown as webpack.WebpackPluginInstance);
    clientConfig!.output!.path = tmpDir;
    webpack(clientConfig).run(() => {});
})();


