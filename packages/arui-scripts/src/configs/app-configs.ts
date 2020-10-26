import path from 'path';
import fs from 'fs';
import merge from 'lodash.merge';
import validateSettingsKeys from './util/validate-settings-keys';

const CWD = process.cwd();

const appPackage = JSON.parse(fs.readFileSync(path.join(CWD, 'package.json'), 'utf8'));

if (appPackage['arui-scripts']) {
    throw Error('arui-scripts in package.json is not supported. Use aruiScripts instead.');
}

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

type AppConfigs = {
    appPackage: any; // todo;
    name: string;
    version: string;
    dockerRegistry: string;
    baseDockerImage: string;

    cwd: string;
    appSrc: string;
    appNodeModules: string;
    buildPath: string;
    assetsPath: string;
    additionalBuildPath: string[];
    nginxRootPath: string;
    runFromNonRootUser: boolean;
    archiveName: string;

    serverEntry: string | string[] | Record<string, string | string[]>;
    serverOutput: string;

    clientPolyfillsEntry: string | null;
    clientEntry: string;
    keepPropTypes: boolean;

    tsconfig: string | null;
    localNginxConf: string | null;
    localDockerfile: string | null;

    useTscLoader: boolean;
    useServerHMR: boolean;
    useYarn: boolean;

    clientServerPort: number;
    serverPort: number;

    debug: boolean;
    hasOverrides: boolean;
    overridesPath: string;

    componentsTheme: string | undefined;
    keepCssVars: boolean;

    publicPath: string;
    serverOutputPath: string;
    clientOutputPath: string;
};

/**
 * Базовые настройки. Часть из них может быть переопределена через env либо через package.json
 */
let config: AppConfigs = {
    appPackage,
    name: appPackage.name,
    version: appPackage.version,
    dockerRegistry: '',
    baseDockerImage: 'alfabankui/arui-scripts:latest',

    // general paths
    cwd: CWD,
    appSrc: absoluteSrcPath,
    appNodeModules: absoluteNodeModulesPath,
    buildPath: '.build',
    assetsPath: 'assets',
    additionalBuildPath: ['config'],
    nginxRootPath: '/src',
    runFromNonRootUser: false,
    archiveName: 'build.tar',

    // server compilation configs
    serverEntry: path.resolve(absoluteSrcPath, 'server/index'),
    serverOutput: 'server.js',

    // client compilation configs
    clientPolyfillsEntry: aruiPolyfills,
    clientEntry: path.resolve(absoluteSrcPath, 'index'),
    keepPropTypes: false,

    // compilation configs locations
    tsconfig: fs.existsSync(projectTsConfigPath) ? projectTsConfigPath : null,
    localNginxConf: fs.existsSync(nginxConfFilePath) ? nginxConfFilePath : null,
    localDockerfile: fs.existsSync(dockerfileFilePath) ? dockerfileFilePath : null,

    useTscLoader: false,
    useServerHMR: false,
    useYarn: fs.existsSync(yarnLockFilePath),
    clientServerPort: 8080,
    serverPort: 3000,

    debug: false,
    hasOverrides: fs.existsSync(overridesPath),
    overridesPath: overridesPath,

    componentsTheme: undefined,
    keepCssVars: true,

    // Эти пути зависят от других настроек, которые могут быть переопределены пользователем
    publicPath: '',
    serverOutputPath: '',
    clientOutputPath: '',
};

/**
 * Эти ключи из конфига будут обновляться из package.json при их наличии
 */
const availablePackageSettings = [
    'dockerRegistry',
    'baseDockerImage',
    'serverEntry',

    'buildPath',
    'assetsPath',
    'additionalBuildPath',
    'nginxRootPath',
    'runFromNonRootUser',
    'archiveName',

    'serverOutput',
    'clientPolyfillsEntry',
    'clientEntry',
    'keepPropTypes',

    'useTscLoader',
    'useServerHMR',
    'clientServerPort',
    'serverPort',

    'debug',
    'componentsTheme',
    'keepCssVars',
];

const packageSettings = appPackage.aruiScripts || {};

validateSettingsKeys(availablePackageSettings, packageSettings);
config = merge(config, packageSettings);

if (process.env.ARUI_SCRIPTS_CONFIG) {
    try {
        console.warn('Используйте ARUI_SCRIPTS_CONFIG только для отладки');
        const envSettings = JSON.parse(process.env.ARUI_SCRIPTS_CONFIG);
        validateSettingsKeys(availablePackageSettings, envSettings);
        config = merge(config, envSettings);
    } catch (e) {
        console.error(e);
        throw Error('Not valid JSON passed. Correct it. For example: ARUI_SCRIPTS_CONFIG="{\"serverPort\":3333}"');
    }
}

//
// Обновляем их в последнюю очередь
config.publicPath = `${config.assetsPath}/`;
config.serverOutputPath = path.resolve(CWD, config.buildPath);
config.clientOutputPath = path.resolve(CWD, config.buildPath, config.assetsPath);

export default config;
