const fs = require('fs');
const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { parseConfigFileTextToJson } = require('typescript');
const merge = require('lodash.merge');
const configs = require('../app-configs').default;
const tsConfigPath = configs.tsconfig;
let tsConfig;
let tsConfigPaths;

if (tsConfigPath) {
    const tsConfigText = fs.readFileSync(configs.tsconfig, 'utf8');

    tsConfig = parseConfigFileTextToJson(tsConfigPath, tsConfigText);
    tsConfigPaths = tsConfig.config.compilerOptions.paths || {};
}

let defaultJestConfig = {
    testRegex: '(^.*src).*(((\/__test__\/|\/__tests__\/).*)|(test|spec|tests))\.(jsx?)$',
    moduleFileExtensions: ['js', 'jsx'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx}'
    ],
    // transform project js and ts files using babel ant ts transformers
    transform: {
        '^.+\\.jsx?$': require.resolve('./babel-transform'),
        // transform other files to simple empty strings
        '^(?!.*\\.(js|jsx|css|json)$)': require.resolve('./file-transform')
    },
    moduleNameMapper: {
        // replace all css files with simple empty exports
        '\\.css$': require.resolve('./css-mock')
    },
    setupFiles: [
        require.resolve('./setup')
    ],
    snapshotSerializers: [
        require.resolve('jest-snapshot-serializer-class-name-to-string')
    ],
};

if (tsConfigPath) {
    defaultJestConfig = {
        ...defaultJestConfig,
        testRegex: '(^.*src).*(((\/__test__\/|\/__tests__\/).*)|(test|spec|tests))\.(jsx?|tsx?)$',
        moduleFileExtensions: [...defaultJestConfig.moduleFileExtensions, 'ts', 'tsx'],
        collectCoverageFrom: [
            'src/**/*.{js,jsx,ts,tsx}'
        ],
        transform: {
            ...defaultJestConfig.transform,
            '^.+\\.tsx?$': require.resolve('ts-jest'),
            // transform other files to simple empty strings
            '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': require.resolve('./file-transform')
        },
        globals: {
            'ts-jest': {
                tsConfig: configs.tsconfig,
                babelConfig: require('../babel-client').default
            }
        },
        moduleNameMapper: {
            ...defaultJestConfig.moduleNameMapper,
            ...pathsToModuleNameMapper(tsConfigPaths, { prefix: '<rootDir>/' })
        },
    };
}

let appJestConfig = {};
if (configs.appPackage.jest) {
    appJestConfig = configs.appPackage.jest;
    if (appJestConfig.preset) { // we don't need presets when using presets
        if (appJestConfig.preset !== 'arui-scripts') {
            console.warn('arui-scripts test command doesn\'t support jest preset config');
        }
        delete appJestConfig.preset;
    }
}

module.exports = merge(defaultJestConfig, appJestConfig);
