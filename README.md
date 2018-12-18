ARUI-scripts
===

Приложение на нашем стеке без какой либо конфигурации билдеров.

Во многом пакет аналогичен `react-scripts` из `create-react-app`, разница заключается
в немного отличающихся настройках для `babel`, поддержки `ts` и возможности работы с серверным кодом.

Использование
===

0. Пакет требует версию nodejs 8+.

1. Установите `arui-scripts` в свой проект как dev зависимость

```bash
yarn add arui-scripts --dev
```
или
```bash
npm install arui-scripts --save-dev
```

2. Создайте необходимые файлы
- `src/index.{js,jsx,ts,tsx}` - входная точка для клиентского приложения.
- `src/server/index.{js,jsx,tsx}` - входная точка для серверного приложения.
- `node_modules/arui-feather/polyfills` - полифилы для клиентского приложения.

При желании вы можете изменить эти пути с помощью настроек.

3. Используйте команды из `arui-scripts`!

Доступные команды
---

- `arui-scripts start` - запускает WebpackDevServer для фронтенда и webpack в режиме `--watch` для сервера.
- `arui-scripts build` - компилирует клиент и сервер для использования в production
- `arui-scripts docker-build` - собирает docker контейнер c production билдом и загружает его в артифактори
- `arui-scripts test` - запускает jest тесты.
- `arui-scripts archive-build` - собирает архив с production билдом


Настройки
---

Несмотря на то, что все работает из коробки, вы можете захотеть поменять некоторые настройки сборщиков.
Сделать это можно в `package.json`, определив там свойство `aruiScripts` или `arui-scripts`.

Доступные настройки:

- `dockerRegistry` - адрес используемого docker registry, по умолчанию `''`, то есть используется публичный registry
- `baseDockerImage` - имя базового образа, используемого для построения docker образа. По умолчанию `heymdall/alpine-node-nginx:8.9.1`.
- `serverEntry` - точка входа для исходников сервера, по умолчанию `src/server/index`.
- `serverOutput` - имя файла для компиляции сервера, по умолчанию `server.js`.
- `clientPolyfillsEntry` - точка входа для полифилов. Будет подключаться до основной точки входа. По умолчанию подтягивает полифилы из `arui-feather`, если он установлен.
- `clientEntry` - точка входа для клиентского приложения. По умолчанию `src/index.js`.
- `useServerHMR` - использовать ли HotModuleReplacement для сервера. По умолчанию `false`.
- `clientServerPort` - порт WebpackDevServer и nginx итогового контейнера. По умолчанию `8080`.
- `serverPort` - порт нодового сервера. Нужен для правильного проксирования запросов от дев сервера и nginx. По умолчанию `3000`.
- `additionalBuildPath` - массив путей, которые попадут в архив при использовании команды `archive-build`. По умолчанию `['config']`.
- `archiveName` - имя архива, который будет создан при использовании команды `archive-build`. По умолчанию `build.tar`.
- `keepPropTypes` - если `true`, пакеты с prop-types не будут удалены из production билда.
- `debug` - режим отладки, в котором не выполняются некоторые нежелательные операции и выводится больше сообщений об ошибках, по умолчанию `false`.
- `useTscLoader` -  использовать ts-loader вместо babel-loader для обработки ts файлов. У babel-loader есть [ряд ограничений](https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/). По умолчанию `false`.

Так же, читаются настройки jest (см. [документацию](https://facebook.github.io/jest/docs/en/configuration.html))
и `proxy` (см. [документацию](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#proxying-api-requests-in-development)).

Переопределение настроек компиляторов
---

По умолчанию для компиляции используется только Babel, для переопределения конфига можете положить файл `.babelrc` в рут папку своего проекта.
TypeScript можно включить, положив `tsconfig.json` в корень проекта.

Пути до ассетов
---
Во время компиляции продакшн версии билда будет созданно два бандла `vendor.[hash].js` и `main.[hash].js`. Для
того, чтобы генерировать правильный html с подключением этих ассетов вы можете использовать файл `webpack-assets.json`
который будет автоматически положен в папку со скомпилированным кодом.

`vendor.js` будет содержать все используемые вами `node_modules`, за исключением модулей, в названии которых содержится `arui`.

`main.js` содержит все остальное.

Важно подключать ваши ассеты в правильном порядке, `vendor.js` должен подключаться ДО `main.js`.

Пример функции, которая сформирует отсортированные в правильном порядке массивы для js и css файлов:
```js
function readAssetsManifest() {
    // читаем манифест
    const manifestPath = path.join(process.cwd(), '.build/webpack-assets.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

    const js = [];
    const css = [];
    // vendor должен идти перед main
    ['vendor', 'main'].forEach((key) => {
        if (!manifest[key]) { // в дев сборке vendor.js не формируется
            return;
        }
        if (manifest[key].js) {
            js.push(manifest[key].js);
        }
        if (manifest[key].css) {
            css.push(manifest[key].css);
        }
    });

    return {
        js, css
    };
}
```

Использование hot-module-replacement
---
#### Клиент:

По умолчанию на клиенте будет подменяться только css. Для правильной работы с react вам надо добавить примерно такой код:
```jsx harmony
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app';
import { AppContainer } from 'react-hot-loader';

ReactDOM.render(
    <AppContainer><App /></AppContainer>,
    document.getElementById('react-app')
);
if (module.hot) {
    module.hot.accept('./app', () => {
        const NextAppAssignments = require('./app').default;
        ReactDOM.render(
            <AppContainer><NextAppAssignments /></AppContainer>,
            document.getElementById('react-app')
        );
    });
}
```

#### Сервер
Серверная часть приложения по умолчанию будет просто перезапускаться после каждого изменения кода,
для использования hot module replacement на сервере нужно сделать несколько вещей:

В `package.json` добавить:
```json
{
    "aruiScripts": { "useServerHMR": true }
}
```

Ваша входная точка сервера должна выглядеть примерно так (на примере hapi):
##### server/index.js
```js
import server from './server';

let currentServer = server;

async function startServer() {
    try {
        await currentServer.start();
    } catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
}

startServer();

if (module.hot) {
    module.hot.accept(['./server'], async () => {
        try {
            await currentServer.stop();

            currentServer = server; // импорт из сервера заменится самостоятельно
            await startServer();
        } catch (error) {
            console.log('Failed to update server. You probably need to restart application', error);
        }
    });
}
```
##### server/server.js
```js
import hapi from 'hapi';
const server = new hapi.Server();

server.ext('onPostStart', (_, done) => {
    console.log(`Server is running: ${server.info.uri}`);
    done();
});

(async () => {
    server.connection({ port: 3000 });

    // ...
    // конфигурация вашего сервера
    // ...
})();

export default server;
```

Таким образом после изменения кода сервер не будет полностью пререзагружаться, что во многих случаях быстрее.
В случае изменения входной точки сервера при использовании HMR вам надо будет перезапускать сервер вручную.

Тесты
---
Команда `arui-scripts test` внутри запускает jest с дополнительной конфигурацией.

Конфигурация включает в себя:
- Использование `jest-snapshot-serializer-class-name-to-string` для правильной работы с `cn`
- Замену всех импортов css файлов на пустые файлы
- Компиляцию .js/.jsx файлов используя babel
- Компиляцию .ts/.tsx файлов используя tsc
- Замену импортов остальных типов файлов на импорт строк с названием файла

По умолчанию под маску для поиска тестов попадают все файлы `*test*.(js|jsx|ts|tsx)`, `*spec*.((js|jsx|ts|tsx))`, `*/__test__/*.(js|jsx|ts|tsx)`.

Вы можете переопределять любые настройки jest в `package.json`, [документация](https://facebook.github.io/jest/docs/en/configuration.html).

Если какие либо из ваших инструментов (например VSСode или WebStorm) не могут запустить тесты поскольку не находят конфигурацию, вы можете так же указать `arui-scripts` как preset для jest.
Таким образом будет работать как запуск тестов через arui-script, так и любые сторонние инструменты, запускающие jest.

##### package.json
```json
{
    "jest": {
        "preset": "arui-scripts"
    }
}
```

docker
---

Команда `arui-scripts docker-build` запускает компиляцию продакшн версии и сборку докер образа.

Образ основан на [alpine-node-nginx](https://github.com/Heymdall/alpine-node-nginx).

Имя контейнера определяется как `{configs.dockerRegistry}/{name}:{version}`. Переменные `name` и `version` по умолчанию берутся из package.json,
но вы так же можете переопределить их из командной строки, например
`arui-scripts docker-build name=container-name version=0.1-beta`

Команда предполагает наличие установленных `node_modules` перед сборкой, в процессе работы же очищает дев зависимости используя `yarn` или `npm`.
yarn будет использоваться когда в рутовой папке проекта есть `yarn.lock` и `yarn` доступен в системе.

Итоговый контейнер будет содержать `nginx` и скрипт для запуска `nginx` одновременно с `nodejs` сервером.

В итоге, для корректного запуска вашего докер-контейнера вам надо будет выполнить

```
docker run -p 8080:8080 container-name:version ./start.sh
```

На `8080` порту будет поднят nginx, который будет раздавать статику и проксировать все остальные запросы к `nodejs`.

Вы также можете переопределить полностью процесс сборки docker-образа, создав в корневой директории проекта `Dockerfile` содержащий необходимый набор инструкций. Пример [Dockerfile](https://github.com/alfa-laboratory/arui-scripts/blob/master/commands/docker-build/dockerfile.template.js).

archive
---

Команда `arui-scripts archive-build` запускает компиляцию продакшн версии и сборку архива со скомпилированным кодом.

Этот вариант может быть полезен если вы хотите деплоить ваше приложение через подключение архива в марафоне.

Команда предполагает наличие установленных `node_modules` перед сборкой, в процессе работы же очищает дев зависимости используя `yarn` или `npm`.
yarn будет использоваться когда в рутовой папке проекта есть `yarn.lock` и `yarn` доступен в системе.

Итоговый архив будет содержать в себе `.build`, `node_modules`, `package.json` и `config` папки вашего проекта.

Проксирование запросов до бэкенда.
---

В случае, если ваш фронт должен обращаться к API, отличному от вашего nodejs сервера, в дев режиме вы можете настроить проксирование запросов.
Сделать это можно используя свойство `proxy` в вашем `package.json`.

Например:

```json
{
    "proxy": {
        "/corp-shared-ui": {
            "target": "http://corpint4",
            "headers": {
                "host": "corpint4"
            }
        }
    }
}
```

Такая конфигурация будет проксировать запросы к `http://localhost:8080/corp-shared-ui/` на `http://corpint4/corp-shared-ui`.
Подробнее о конфигурации прокси сервера можно почитать в [документации Webpack](https://webpack.js.org/configuration/dev-server/#devserver-proxy).

Конфигурация typescript
---

Компиляция TS работает из коробки, если в корне проекта есть файл `tsconfig.json`.
За основу можно использовать дефолтный конфиг:

```json
{
    "extends": "./node_modules/arui-scripts/configs/tsconfig.json"
}
```

По умолчанию TS будет компилироваться через babel, но у этого есть ряд ограничений:
- нельзя использовать namespace
- Нельзя использовать устаревший синтаксис import/export (`import foo = require(...)`, `export = foo`)
- enum merging

Если вы используете что-то из вышеперичисленного - вы можете вернуться к использованию tsc для компиляции ts файлов

```json
{
    "arui-scripts": { "useTscLoader": true }
}
```

Конфигурация nginx
---

Несмотря на то, что nginx имеет готовый конфиг с роутингом, иногда возникает необходимость добавлять свои роуты.
Для этого вы можете создать `nginx.conf` на уровне проекта со своими роутами. Пример конфига: arui-scripts/commands/docker-build/nginx.conf.template.js


Удаление proptypes
---

Так как в production режими proptypes не проверяются, их имеет смысл удалить из production сборки.

Сами объявления proptypes удаляются с помощью [babel-plugin-transform-react-remove-prop-types](https://www.npmjs.com/package/babel-plugin-transform-react-remove-prop-types).
Но импорты пакетов `prop-types` при этом не удаляются. Чтобы это реализовать, используется `webpack.NormalModuleReplacementPlugin`.
С помощью него заменяются на пустышку пакеты, попадающие под маску:

- `/^react-style-proptype$/`
- `/^thrift-services\/proptypes/`

Если, по какой то причине, вы не хотите такого поведения - вы можете отключить его, добавив в `package.json`:

```json
{
    "aruiScripts": {
        "keepPropTypes": true
    }
}
```

require не js файлов в node_modules в node.js
---
Сборка серверной части устроена таким образом, что большая часть `node_modules` не вкомпиливается
в итоговый бандл, а загружается стандартным `require` node.js. Как правило - это нам и нужно.
Но в случае react-компонентов, мы зачастую запрашиваем кроме кода компонентов еще и `.css`, `.png` и другие файлы.
require node.js на таких местах ломается. Поэтому наши внутренние библиотеки компонентов все же вкомпиливаются
в итоговый бандл сервера. Это сделанно с помощью [добавления их в исключение](https://github.com/alfa-laboratory/arui-scripts/blob/master/configs/webpack.server.dev.js#L51)
плагина [webpack-node-externals](https://www.npmjs.com/package/webpack-node-externals).
В случае, если вам необходима обработка не-js файлов из других внешних модулей - вы можете
воспользоваться механизмом `overrides`, описанным ниже.
По умолчанию же все не-js файлы из внешних модулей будут проигнорированы.



Тонкая настройка
===
Если вам не хватает гибкости при использовании `arui-scripts`, например вы хотите добавить свой плагин для вебпака -
вы можете воспользоваться механизмом `overrides`.

Для этого вам необходимо создать в корне вашего проекта файл `arui-scripts.overrides.js`, из которого вы сможете управлять
конфигурацией почти всех инструментов, используемых в `arui-scripts`.

Принцип работы тут следующий. Для всех конфигураций определен набор ключей, которые они будут искать в `arui-scripts.overrides.js`,
В случае если такой ключ найден и это функция - она будет вызвана, и в качестве аргумента ей будет передана существующая конфигурация.
Возвращать такая функция должна так же конфигурацию.

Например такое содержимое `arui-scripts.overrides.js`:
```javascript
const path = require('path');
module.exports = {
    webpack: (config) => {
        config.resolve.alias = {
            components: path.resolve(__dirname, 'src/components')
        };
        return config;
    }
};
```

С помощью этой конфигурации ко всем настройкам вебпака будет добавлен `alias` *components*.

На данный момент можно переопределять следующие конфигурации:
- `babel-client` - конфигурация `babel` для клиентского кода. Ключи: `babel`, `babelClient`.
- `babel-server` - конфигурация `babel` для серверноого кода. Ключи: `babel`, `babelServer`.
- `dev-server` - конфигурация `webpack-dev-server`. Ключи: `devServer`.
- `postcss` - конфигурация для `postcss`. Ключи: `postcss`.
  > `config` postcss содержит массив с уже инициализированными плагинами, параметры которых уже зафиксированны. Если необходимо изменить параметры плагинов можно пересоздать конфиг, таким образом:
    ```javascript
    const {
        createPostcssConfig, // функция для создания конфигурационного файла postcss
        postcssPlugins, // список плагинов
        postcssPluginsOptions, // коллекция конфигураций плагинов
    } = require('arui-scripts/configs/postcss.config');

    module.exports = {
        postcss: () => {
            const newOption = {
                ...postcssPluginsOptions,
                'postcss-import': {
                    ...postcssPluginsOptions['postcss-import'],
                    path: [...postcssPluginsOptions['postcss-import'].path, './src'],
                },
            };
            return createPostcssConfig(postcssPlugins, newOption);
        },
    };
    ```
- `stats-options` - конфигурация для [webpack-stats](https://webpack.js.org/configuration/stats/). Ключи: `stats`.
- `webpack.client.dev` - конфигурация для клиентского webpack в dev режиме. Ключи: `webpack`, `webpackClient`, `webpackDev`, `webpackClientDev`.
- `webpack.client.prod` - конфигурация для клиентского webpack в prod режиме. Ключи: `webpack`, `webpackClient`, `webpackProd`, `webpackClientProd`.
- `webpack.server.dev` - конфигурация для серверного webpack в dev режиме. Ключи: `webpack`, `webpackServer`, `webpackDev`, `webpackServerDev`.
- `webpack.server.prod` - конфигурация для серверного webpack в prod режиме. Ключи: `webpack`, `webpackServer`, `webpackProd`, `webpackServerProd`.

Для некоторых конфигураций определены несколько ключей, они будут применяться в том порядке, в котором они приведены в этом файле.
