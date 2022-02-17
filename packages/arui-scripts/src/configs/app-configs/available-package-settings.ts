import { AppConfigs } from './types';

/**
 * Эти ключи из конфига будут обновляться из package.json при их наличии
 */
export const availablePackageSettings: Array<keyof AppConfigs> = [
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
    'statsOutputFilename',
    'componentsTheme',
    'keepCssVars',
];
