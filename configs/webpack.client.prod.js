const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const configs = require('./app-configs');
const babelConf = require('./babel-client');
const postcssConf = require('./postcss');
const applyOverrides = require('./util/apply-overrides');

const extractTextPluginOptions = { publicPath: './' };
const noopPath = require.resolve('./util/noop');

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
// The production configuration is different and lives in a separate file.
module.exports = applyOverrides(['webpack', 'webpackClient', 'webpackProd', 'webpackClientProd'], {
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
    devtool: 'cheap-module-source-map',
    // In production, we only want to load the polyfills and the app code.
    entry: [configs.clientPolyfillsEntry, configs.clientEntry],
    context: configs.cwd,
    output: {
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        path: configs.clientOutputPath,
        publicPath: configs.publicPath,
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path
                .relative(configs.appSrc, info.absoluteResourcePath)
                .replace(/\\/g, '/'),
    },
    resolve: {
        // This allows you to set a fallback for where Webpack should look for modules.
        // We placed these paths second because we want `node_modules` to "win"
        // if there are any conflicts. This matches Node resolution mechanism.
        // https://github.com/facebookincubator/create-react-app/issues/253
        modules: ['node_modules', configs.appNodeModules],
        // These are the reasonable defaults supported by the Node ecosystem.
        // We also include JSX as a common component filename extension to support
        // some tools, although we do not recommend using it, see:
        // https://github.com/facebookincubator/create-react-app/issues/290
        // `web` extension prefixes have been added for better support
        // for React Native Web.
        extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', '.ts', '.tsx'],
    },
    module: {
        strictExportPresence: true,
        rules: [
            {
                // "oneOf" will traverse all following loaders until one will
                // match the requirements. When no loader matches it will fall
                // back to the "file" loader at the end of the loader list.
                oneOf: [
                    // "url" loader works like "file" loader except that it embeds assets
                    // smaller than specified limit in bytes as data URLs to avoid requests.
                    // A missing `test` is equivalent to a match.
                    {
                        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                        loader: require.resolve('url-loader'),
                        options: {
                            limit: 10000,
                            name: '[name].[hash:8].[ext]',
                        },
                    },
                    // Process JS with Babel.
                    {
                        test: /\.(js|jsx|mjs)$/,
                        include: configs.appSrc,
                        loader: require.resolve('babel-loader'),
                        options: babelConf,
                    },
                    // Process TS with tsc
                    configs.tsconfig !== null && {
                        test: /\.tsx?$/,
                        use: [
                            {
                                loader: require.resolve('babel-loader'),
                                options: babelConf
                            },
							{
								loader: require.resolve('cache-loader')
							},
							{
                                loader: require.resolve('ts-loader'),
                                options: {
                                    onlyCompileBundledFiles: true,
									happyPackMode: true,
                                    configFile: configs.tsconfig
                                }
                            }
                        ]
                    },
                    // The notation here is somewhat confusing.
                    // "postcss" loader applies autoprefixer to our CSS.
                    // "css" loader resolves paths in CSS and adds assets as dependencies.
                    // "style" loader normally turns CSS into JS modules injecting <style>,
                    // but unlike in development configuration, we do something different.
                    // `ExtractTextPlugin` first applies the "postcss" and "css" loaders
                    // (second argument), then grabs the result CSS and puts it into a
                    // separate file in our build process. This way we actually ship
                    // a single CSS file in production instead of JS code injecting <style>
                    // tags. If you use code splitting, however, any async bundles will still
                    // use the "style" loader inside the async code so CSS from them won't be
                    // in the main CSS file.
                    {
                        test: /\.css$/,
                        loader: ExtractTextPlugin.extract(
                            Object.assign(
                                {
                                    fallback: {
                                        loader: require.resolve('style-loader'),
                                        options: {
                                            hmr: false,
                                        },
                                    },
                                    use: [
                                        {
                                            loader: require.resolve('css-loader'),
                                            options: {
                                                importLoaders: 1,
                                                minimize: true,
                                                sourceMap: false,
                                            },
                                        },
                                        {
                                            loader: require.resolve('postcss-loader'),
                                            options: {
                                                // Necessary for external CSS imports to work
                                                // https://github.com/facebookincubator/create-react-app/issues/2677
                                                ident: 'postcss',
                                                plugins: () => postcssConf,
                                            },
                                        },
                                    ],
                                },
                                extractTextPluginOptions
                            )
                        ),
                        // Note: this won't work without `new ExtractTextPlugin()` in `plugins`.
                    },
                    // "file" loader makes sure those assets get served by WebpackDevServer.
                    // When you `import` an asset, you get its (virtual) filename.
                    // In production, they would get copied to the `build` folder.
                    // This loader doesn't use a "test" so it will catch all modules
                    // that fall through the other loaders.
                    {
                        // Exclude `js` files to keep "css" loader working as it injects
                        // its runtime that would otherwise processed through "file" loader.
                        // Also exclude `html` and `json` extensions so they get processed
                        // by webpacks internal loaders.
                        exclude: [/\.(js|jsx|mjs|ts|tsx)$/, /\.(html|ejs)$/, /\.json$/],
                        loader: require.resolve('file-loader'),
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]',
                        },
                    },
                ].filter(Boolean),
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
        ],
    },
    plugins: [
        new AssetsPlugin({ path: configs.serverOutputPath }),
        // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
        new ExtractTextPlugin({
            filename: '[name].[contenthash:8].css',
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks(module) {
                return module.userRequest
                    && (module.userRequest.indexOf('arui') === -1 || module.userRequest.indexOf('polyfills') !== -1)
                    && module.userRequest.indexOf('node_modules') !== -1;
            }
        }),
        new ManifestPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                reduceIdents: {
                    keyframes: false
                }
            }
        }),
        new CompressionPlugin({
            asset: '[file].gz',
            algorithm: 'gzip',
            regExp: /\.js$|\.css$|\.png$|\.svg$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            mangle: {
                safari10: true,
            },
            output: {
                comments: false,
                // Turned on because emoji and regex is not minified properly using default
                // https://github.com/facebookincubator/create-react-app/issues/2488
                ascii_only: true,
            },
            sourceMap: false,
        }),
        configs.tsconfig !== null && new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    ].filter(Boolean).concat(
        // Ignore prop-types packages in production mode
        // This should works fine, since proptypes usage should be eliminated in production mode
        configs.keepPropTypes
            ? []
            : [
                new webpack.NormalModuleReplacementPlugin(
                    /^prop-types$/,
                    noopPath
                ),
                new webpack.NormalModuleReplacementPlugin(
                    /^react-style-proptype$/,
                    noopPath
                ),
                new webpack.NormalModuleReplacementPlugin(
                    /^thrift-services\/proptypes/,
                    noopPath
                )
            ]
    ),
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    }
});
