import webpack from 'webpack'
import printCompilerOutput from './print-compiler-output';
import serverConfig from '../../configs/webpack.server.dev';

const serverCompiler = webpack(serverConfig);

serverCompiler.hooks.compile.tap('server', () => console.log('Compiling server...'));
serverCompiler.hooks.invalid.tap('server', () => console.log('Compiling server...'));
serverCompiler.hooks.done.tap('server', (stats: any) => printCompilerOutput('Server', stats));

serverCompiler.watch({ aggregateTimeout: 100 }, () => {});

