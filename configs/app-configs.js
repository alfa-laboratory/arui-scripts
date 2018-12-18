const path = require('path');
const fs = require('fs');
const CWD = process.cwd();

const appPackage = JSON.parse(fs.readFileSync(path.join(CWD, 'package.json'), 'utf8'));
const packageSettings = appPackage.aruiScripts || appPackage['arui-scripts'] || {};

const buildPath = packageSettings.buildPath || '.build';
const assetsPath = packageSettings.assetsPath || 'assets';

const absoluteSrcPath = path.resolve(CWD, 'src');
const absoluteNodeModulesPath = path.resolve(CWD, 'node_modules');

const projectTsConfigPath = path.join(CWD, 'tsconfig.json');
const yarnLockFilePath = path.join(CWD, 'yarn.lock');
const overridesPath = path.join(CWD, 'arui-scripts.overrides.js');
const nginxConfFilePath = path.join(CWD, 'nginx.conf');
const dockerfileFilePath = path.join(CWD, 'Dockerfile');

let aruiPolyfills = null;
try {
    aruiPolyfills = require.resolve('arui-feather/polyfills');
} catch (error) {
    // just ignore it
}

module.exports = {
    appPackage,
    name: appPackage.name,
    version: appPackage.version,
    dockerRegistry: '' || packageSettings.dockerRegistry,
    baseDockerImage: packageSettings.baseDockerImage || 'heymdall/alpine-node-nginx:8.9.1',

    // general paths
    cwd: CWD,
    appSrc: absoluteSrcPath,
    appNodeModules: absoluteNodeModulesPath,
    publicPath: `${assetsPath}/`,
    buildPath,
    additionalBuildPath: ['config'],
    archiveName: 'build.tar',

    // server compilation configs
    serverEntry: packageSettings.serverEntry || path.resolve(absoluteSrcPath, 'server/index'),
    serverOutput: packageSettings.serverOutput || 'server.js',
    serverOutputPath: path.resolve(CWD, buildPath),

    // client compilation configs
    clientPolyfillsEntry: packageSettings.clientPolyfillsEntry || aruiPolyfills,
    clientEntry: packageSettings.clientEntry || path.resolve(absoluteSrcPath, 'index'),
    clientOutputPath: path.resolve(CWD, buildPath, assetsPath),
    keepPropTypes: packageSettings.keepPropTypes || false,

    // compilation configs locations
    tsconfig: fs.existsSync(projectTsConfigPath) ? projectTsConfigPath : null,
	localNginxConf: fs.existsSync(nginxConfFilePath) ? nginxConfFilePath : null,
	localDockerfile: fs.existsSync(dockerfileFilePath) ? dockerfileFilePath : null,

    useTscLoader: packageSettings.useTscLoader || false,
    useServerHMR: typeof packageSettings.useServerHMR !== 'undefined' ? !!packageSettings.useServerHMR : false,
    useYarn: fs.existsSync(yarnLockFilePath),
    clientServerPort: packageSettings.clientServerPort ? parseInt(packageSettings.clientServerPort, 10) : 8080,
    serverPort: packageSettings.serverPort ? parseInt(packageSettings.serverPort, 10) : 3000,

    debug: !!packageSettings.debug,
    hasOverrides: fs.existsSync(overridesPath),
    overridesPath: overridesPath
};
