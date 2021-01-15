## [10.1.4](https://github.com/alfa-laboratory/arui-scripts/compare/v10.1.3...v10.1.4) (2021-01-15)


### Bug Fixes

* fix folder error ([eb5faa1](https://github.com/alfa-laboratory/arui-scripts/commit/eb5faa1a8221d09b75de477db2c8754ba909d881))



## [10.1.3](https://github.com/alfa-laboratory/arui-scripts/compare/v10.1.2...v10.1.3) (2020-12-18)


### Bug Fixes

* **dev-server:** fix wrong path and url comparison on windows ([d488311](https://github.com/alfa-laboratory/arui-scripts/commit/d488311d88343647d19f65daa2364dcb9fb7035c))



## [10.1.2](https://github.com/alfa-laboratory/arui-scripts/compare/v10.1.1...v10.1.2) (2020-12-17)


### Bug Fixes

* **nginx:** always use only ipv4 host ([fe73d1c](https://github.com/alfa-laboratory/arui-scripts/commit/fe73d1c41d3f14afdc41c137b760a253eaea2755))



## [10.1.1](https://github.com/alfa-laboratory/arui-scripts/compare/v10.1.0...v10.1.1) (2020-11-30)


### Bug Fixes

* **tsconfig:** formatting fix ([32b2248](https://github.com/alfa-laboratory/arui-scripts/commit/32b22485197a90bb004deb7d5dedd14f2b89dc10))
* **tsconfig:** separate build config from published config ([a55051d](https://github.com/alfa-laboratory/arui-scripts/commit/a55051d06f2ee8df86a6c78ebee5d13dba2a713c))



# [10.1.0](https://github.com/alfa-laboratory/arui-scripts/compare/v10.0.1...v10.1.0) (2020-11-10)


### Features

* **webpack-client:** use svg-url-loader for svg ([638d601](https://github.com/alfa-laboratory/arui-scripts/commit/638d6015b1c49863468a0599609e3e107d08bc2d))



## [10.0.1](https://github.com/alfa-laboratory/arui-scripts/compare/v10.0.0...v10.0.1) (2020-11-09)


### Bug Fixes

* **alpine-node:** push docker image on commit ([7e8c286](https://github.com/alfa-laboratory/arui-scripts/commit/7e8c286a8f038dee5c5f6f020e5f3dc7c9a193d6))
* **webpack-dev:** add public path, so images loads correctly in dev mode ([e5c8a16](https://github.com/alfa-laboratory/arui-scripts/commit/e5c8a1640d674324ef835a68b76b251cd8772575))
* **webpack-server:** add date-fns to externals, so it won't conflict with arui-feather date-fns ([131e9b2](https://github.com/alfa-laboratory/arui-scripts/commit/131e9b2d17804f6af378bb3c8adfbbd36ec4a8ee))



# [10.0.0](https://github.com/alfa-laboratory/arui-scripts/compare/v9.7.0...v10.0.0) (2020-10-26)


### Bug Fixes

* replace remaining require with imports ([094d6c2](https://github.com/alfa-laboratory/arui-scripts/commit/094d6c24f80a3d4fb9d6e72629f6505a3b307904))
* **alpine-node-nginx:** fix gpg errors ([33e6f72](https://github.com/alfa-laboratory/arui-scripts/commit/33e6f722b6dee26a0e66dcc979e05729f1927b79))
* **dependencies:** ts as peer dependency ([438c7e7](https://github.com/alfa-laboratory/arui-scripts/commit/438c7e76023ab4e65bc67c0efa95a50da78f8395))
* **get-entry:** remove console.log ([39d735d](https://github.com/alfa-laboratory/arui-scripts/commit/39d735db9b3709248ae3b8c7083541ac0c2187c6))
* **jest:** correctly resolve path to all file mappers ([fcc34f9](https://github.com/alfa-laboratory/arui-scripts/commit/fcc34f99cca471c34b85c2b7dab4d838430770ca))
* **ts-node:** configure it from single place ([e68eda5](https://github.com/alfa-laboratory/arui-scripts/commit/e68eda5058b694497af69978410c29541d541b0b))
* **webpack-server:** fix node-externals in workspaces ([c283ae0](https://github.com/alfa-laboratory/arui-scripts/commit/c283ae0c9dface9e99a501f544a9ffc16ed2c22c))
* **yarn:** fix ci configs ([b4d1162](https://github.com/alfa-laboratory/arui-scripts/commit/b4d1162c92febf6167edcb83c81f6e884f71d092))


### Features

* ts in all webpack configs ([e051e29](https://github.com/alfa-laboratory/arui-scripts/commit/e051e293a73c837d8d0cc53f32e262f0883a8d87))
* yarn 2 support ([73bef4f](https://github.com/alfa-laboratory/arui-scripts/commit/73bef4f711c9b3c446665d38994447cdd896577e))
* **alpine-node-nginx:** add docker build workflow ([2d95808](https://github.com/alfa-laboratory/arui-scripts/commit/2d958084feac5ba52b5d269eb90ed946f87eb7ba))
* **alpine-node-nginx:** read version from version file ([dce6105](https://github.com/alfa-laboratory/arui-scripts/commit/dce6105a5a189c009947d4cddc947ce35ed555c6))



<a name="9.7.0"></a>
# [9.7.0](https://github.com/alfa-laboratory/arui-scripts/compare/v9.6.0...v9.7.0) (2020-10-22)


### Features

* **webpack:** split dynamic import from node_modules to chunk ([ba6a286](https://github.com/alfa-laboratory/arui-scripts/commit/ba6a286))



<a name="9.6.0"></a>
# [9.6.0](https://github.com/alfa-laboratory/arui-scripts/compare/v9.5.0...v9.6.0) (2020-10-08)


### Features

* **postcss-config:** add keepCssVars, revert plugin ([2d8a0d6](https://github.com/alfa-laboratory/arui-scripts/commit/2d8a0d6))



<a name="9.5.0"></a>
# [9.5.0](https://github.com/alfa-laboratory/arui-scripts/compare/v9.4.1...v9.5.0) (2020-09-22)


### Features

* **webpack:** replace style tags with optimized css bundle in dev ([22681f2](https://github.com/alfa-laboratory/arui-scripts/commit/22681f2))



<a name="9.4.1"></a>
## [9.4.1](https://github.com/alfa-laboratory/arui-scripts/compare/v9.4.0...v9.4.1) (2020-09-11)


### Features

* **postcss-config:** add postcss-color-mod-function ([a619453](https://github.com/alfa-laboratory/arui-scripts/commit/a619453))



<a name="9.4.0"></a>
# [9.4.0](https://github.com/alfa-laboratory/arui-scripts/compare/v9.3.2...v9.4.0) (2020-08-19)


### Bug Fixes

* **check-required-files:** skip empty files from config ([34701c5](https://github.com/alfa-laboratory/arui-scripts/commit/34701c5))


### Features

* **webpack:** add support for multiple entrypoints ([508c5c1](https://github.com/alfa-laboratory/arui-scripts/commit/508c5c1))



<a name="9.3.2"></a>
## [9.3.2](https://github.com/alfa-laboratory/arui-scripts/compare/v9.3.1...v9.3.2) (2020-08-18)


### Features

* **supporting-browsers:** add supporting-browsers to overrides ([2671fd5](https://github.com/alfa-laboratory/arui-scripts/commit/2671fd5))



<a name="9.3.1"></a>
## [9.3.1](https://github.com/alfa-laboratory/arui-scripts/compare/v9.3.0...v9.3.1) (2020-07-28)



<a name="9.3.0"></a>
# [9.3.0](https://github.com/alfa-laboratory/arui-scripts/compare/v9.2.0...v9.3.0) (2020-07-03)


### Bug Fixes

* **assets-size:** use brotli-size as optional dependency ([144980b](https://github.com/alfa-laboratory/arui-scripts/commit/144980b))
* **config:** add theme setting and change to eng ([1befdf6](https://github.com/alfa-laboratory/arui-scripts/commit/1befdf6))
* **deps:** update [@alfalab](https://github.com/alfalab)/postcss-custom-properties ([24078ba](https://github.com/alfa-laboratory/arui-scripts/commit/24078ba))
* **tests:** remove unused flag ([328bab6](https://github.com/alfa-laboratory/arui-scripts/commit/328bab6))
* **tsconfig:** disable removeComments flag ([30cc24e](https://github.com/alfa-laboratory/arui-scripts/commit/30cc24e)), closes [#117](https://github.com/alfa-laboratory/arui-scripts/issues/117)
* **webpack-server:** source-map-support is now optional ([7996d82](https://github.com/alfa-laboratory/arui-scripts/commit/7996d82)), closes [#43](https://github.com/alfa-laboratory/arui-scripts/issues/43)


### Features

* **assets-size:** print brotli size when possible ([d744fa4](https://github.com/alfa-laboratory/arui-scripts/commit/d744fa4)), closes [#114](https://github.com/alfa-laboratory/arui-scripts/issues/114)
* **config:** check passed settings ([7653a90](https://github.com/alfa-laboratory/arui-scripts/commit/7653a90))
* **webpack:** add bundle-analyze command ([705d87e](https://github.com/alfa-laboratory/arui-scripts/commit/705d87e)), closes [#115](https://github.com/alfa-laboratory/arui-scripts/issues/115)



<a name="9.2.0"></a>
# [9.2.0](https://github.com/alfa-laboratory/arui-scripts/compare/v9.1.0...v9.2.0) (2020-06-15)


### Bug Fixes

* **client:** disable brotli on node < 10 ([fc274f9](https://github.com/alfa-laboratory/arui-scripts/commit/fc274f9))


### Features

* **client:** add brotli support ([062e42c](https://github.com/alfa-laboratory/arui-scripts/commit/062e42c))



<a name="9.1.0"></a>
# [9.1.0](https://github.com/alfa-laboratory/arui-scripts/compare/v9.0.4...v9.1.0) (2020-06-03)


### Bug Fixes

* **postcss.config.js:** add docs, export theme setting from app-configs ([7a367c4](https://github.com/alfa-laboratory/arui-scripts/commit/7a367c4))
* **postcss.config.js:** fix and simplify theme setting ([bed0cab](https://github.com/alfa-laboratory/arui-scripts/commit/bed0cab))



<a name="9.0.4"></a>
## [9.0.4](https://github.com/alfa-laboratory/arui-scripts/compare/v9.0.3...v9.0.4) (2020-06-02)


### Bug Fixes

* **tsconfig:** allow import json modules ([45e5c07](https://github.com/alfa-laboratory/arui-scripts/commit/45e5c07))


### Features

* **docker-build:** fetch registry from args ([79bac18](https://github.com/alfa-laboratory/arui-scripts/commit/79bac18))



<a name="9.0.3"></a>
## [9.0.3](https://github.com/alfa-laboratory/arui-scripts/compare/v9.0.2...v9.0.3) (2020-05-25)



<a name="9.0.2"></a>
## [9.0.2](https://github.com/alfa-laboratory/arui-scripts/compare/v9.0.1...v9.0.2) (2020-05-19)


### Features

* add newclick-composite-components to whitelist ([ff6c1f8](https://github.com/alfa-laboratory/arui-scripts/commit/ff6c1f8))



<a name="9.0.1"></a>
## [9.0.1](https://github.com/alfa-laboratory/arui-scripts/compare/v9.0.0...v9.0.1) (2020-04-27)


### Bug Fixes

* **webpack-client:** work with array-style webpack configs correctly ([6f8c912](https://github.com/alfa-laboratory/arui-scripts/commit/6f8c912))



<a name="9.0.0"></a>
# [9.0.0](https://github.com/alfa-laboratory/arui-scripts/compare/v8.5.1...v9.0.0) (2020-04-20)


### Features

* **config:** use node 12 as default base image ([cc8ef06](https://github.com/alfa-laboratory/arui-scripts/commit/cc8ef06))



<a name="8.5.1"></a>
## [8.5.1](https://github.com/alfa-laboratory/arui-scripts/compare/v8.5.0...v8.5.1) (2020-04-16)


### Features

* css vars theming ([1c8029b](https://github.com/alfa-laboratory/arui-scripts/commit/1c8029b))



<a name="8.5.0"></a>
# [8.5.0](https://github.com/alfa-laboratory/arui-scripts/compare/v8.4.0...v8.5.0) (2020-04-01)



<a name="8.4.0"></a>
# [8.4.0](https://github.com/alfa-laboratory/arui-scripts/compare/v8.3.4...v8.4.0) (2020-03-23)


### Bug Fixes

* update babel version ([5f7d508](https://github.com/alfa-laboratory/arui-scripts/commit/5f7d508))


### Features

* **conf:** disable allowJs rule ([49cfc56](https://github.com/alfa-laboratory/arui-scripts/commit/49cfc56))



<a name="8.3.4"></a>
## [8.3.4](https://github.com/alfa-laboratory/arui-scripts/compare/v8.3.3...v8.3.4) (2020-03-06)



<a name="8.3.3"></a>
## [8.3.3](https://github.com/alfa-laboratory/arui-scripts/compare/v8.3.2...v8.3.3) (2020-03-06)


### Bug Fixes

* remove bad tests ([81cb375](https://github.com/alfa-laboratory/arui-scripts/commit/81cb375))
* restore utils ([0434106](https://github.com/alfa-laboratory/arui-scripts/commit/0434106))
* **tests:** textRegex path ([9ed4589](https://github.com/alfa-laboratory/arui-scripts/commit/9ed4589))



<a name="8.3.2"></a>
## [8.3.2](https://github.com/alfa-laboratory/arui-scripts/compare/v8.3.0...v8.3.2) (2020-03-04)


### Bug Fixes

* **nginx.conf.template:** updated rule for request's max body size ([5364789](https://github.com/alfa-laboratory/arui-scripts/commit/5364789))


### Features

* add .editorconfig ([c0238d4](https://github.com/alfa-laboratory/arui-scripts/commit/c0238d4))
* change some rules in .editorconfig ([cae471b](https://github.com/alfa-laboratory/arui-scripts/commit/cae471b))
* update [@babel](https://github.com/babel)/preset-env, remove usless deps ([10b9993](https://github.com/alfa-laboratory/arui-scripts/commit/10b9993))
* update yarn.lock ([889fbf0](https://github.com/alfa-laboratory/arui-scripts/commit/889fbf0))



<a name="8.3.1"></a>
## [8.3.1](https://github.com/alfa-laboratory/arui-scripts/compare/v8.3.0...v8.3.1) (2020-03-04)


### Features

* add .editorconfig ([c0238d4](https://github.com/alfa-laboratory/arui-scripts/commit/c0238d4))
* change some rules in .editorconfig ([cae471b](https://github.com/alfa-laboratory/arui-scripts/commit/cae471b))
* update [@babel](https://github.com/babel)/preset-env, remove usless deps ([10b9993](https://github.com/alfa-laboratory/arui-scripts/commit/10b9993))
* update yarn.lock ([889fbf0](https://github.com/alfa-laboratory/arui-scripts/commit/889fbf0))



<a name="8.3.0"></a>
# [8.3.0](https://github.com/alfa-laboratory/arui-scripts/compare/v8.2.6...v8.3.0) (2020-02-11)



<a name="8.2.6"></a>
## [8.2.6](https://github.com/alfa-laboratory/arui-scripts/compare/v8.2.5...v8.2.6) (2020-02-05)


### Bug Fixes

* hotfix, according latest webpack dev server docs ([268a6fc](https://github.com/alfa-laboratory/arui-scripts/commit/268a6fc))



<a name="8.2.5"></a>
## [8.2.5](https://github.com/alfa-laboratory/arui-scripts/compare/v8.2.4...v8.2.5) (2020-02-05)



<a name="8.2.4"></a>
## [8.2.4](https://github.com/alfa-laboratory/arui-scripts/compare/v8.2.3...v8.2.4) (2020-02-05)


### Features

* use react dev utils for css modules ([35c4329](https://github.com/alfa-laboratory/arui-scripts/commit/35c4329))



<a name="8.2.3"></a>
## [8.2.3](https://github.com/alfa-laboratory/arui-scripts/compare/v8.2.2...v8.2.3) (2020-02-02)


### Bug Fixes

* fix regexp to exclude test files outside of src dir ([8a8729b](https://github.com/alfa-laboratory/arui-scripts/commit/8a8729b))



<a name="8.2.2"></a>
## [8.2.2](https://github.com/alfa-laboratory/arui-scripts/compare/v8.2.1...v8.2.2) (2020-01-28)


### Bug Fixes

* remove invalid option ([1de8fae](https://github.com/alfa-laboratory/arui-scripts/commit/1de8fae))
* up css loader ([32dec5e](https://github.com/alfa-laboratory/arui-scripts/commit/32dec5e))



<a name="8.2.1"></a>
## [8.2.1](https://github.com/alfa-laboratory/arui-scripts/compare/v8.2.0...v8.2.1) (2020-01-17)


### Bug Fixes

* **jest-config:** fix test files regexp ([d208b34](https://github.com/alfa-laboratory/arui-scripts/commit/d208b34))



<a name="8.2.0"></a>
# [8.2.0](https://github.com/alfa-laboratory/arui-scripts/compare/v8.0.0...v8.2.0) (2020-01-16)


### Bug Fixes

* **config:** change assets RegExp in proxy ([3321833](https://github.com/alfa-laboratory/arui-scripts/commit/3321833))
* **config:** use publicPath config property for assets path ([61f7a83](https://github.com/alfa-laboratory/arui-scripts/commit/61f7a83))
* **dev-server:** make correct method startWith -> startsWith ([cf91a62](https://github.com/alfa-laboratory/arui-scripts/commit/cf91a62))


### Features

* **babel:** add optional chaining and nullish coalescing support ([8fa3211](https://github.com/alfa-laboratory/arui-scripts/commit/8fa3211))
* **ci:** add yarn cache ([17ff911](https://github.com/alfa-laboratory/arui-scripts/commit/17ff911))
* **jest:** dynamic pass paths from tsconfig for aliases ([cfaed8f](https://github.com/alfa-laboratory/arui-scripts/commit/cfaed8f))
* **jest:** make more correct title for some variables ([28766c6](https://github.com/alfa-laboratory/arui-scripts/commit/28766c6))



<a name="8.1.1"></a>
## [8.1.1](https://github.com/alfa-laboratory/arui-scripts/compare/v8.0.0...v8.1.1) (2020-01-14)


### Bug Fixes

* **config:** change assets RegExp in proxy ([3321833](https://github.com/alfa-laboratory/arui-scripts/commit/3321833))
* **config:** use publicPath config property for assets path ([61f7a83](https://github.com/alfa-laboratory/arui-scripts/commit/61f7a83))
* **dev-server:** make correct method startWith -> startsWith ([cf91a62](https://github.com/alfa-laboratory/arui-scripts/commit/cf91a62))


### Features

* **ci:** add yarn cache ([17ff911](https://github.com/alfa-laboratory/arui-scripts/commit/17ff911))
* **jest:** dynamic pass paths from tsconfig for aliases ([cfaed8f](https://github.com/alfa-laboratory/arui-scripts/commit/cfaed8f))
* **jest:** make more correct title for some variables ([28766c6](https://github.com/alfa-laboratory/arui-scripts/commit/28766c6))



<a name="8.1.0"></a>
# [8.1.0](https://github.com/alfa-laboratory/arui-scripts/compare/v8.0.0...v8.1.0) (2020-01-13)


### Bug Fixes

* **config:** change assets RegExp in proxy ([3321833](https://github.com/alfa-laboratory/arui-scripts/commit/3321833))
* **config:** use publicPath config property for assets path ([61f7a83](https://github.com/alfa-laboratory/arui-scripts/commit/61f7a83))


### Features

* **ci:** add yarn cache ([17ff911](https://github.com/alfa-laboratory/arui-scripts/commit/17ff911))
* **jest:** dynamic pass paths from tsconfig for aliases ([cfaed8f](https://github.com/alfa-laboratory/arui-scripts/commit/cfaed8f))
* **jest:** make more correct title for some variables ([28766c6](https://github.com/alfa-laboratory/arui-scripts/commit/28766c6))



<a name="8.0.0"></a>
# [8.0.0](https://github.com/alfa-laboratory/arui-scripts/compare/v7.0.0...v8.0.0) (2019-12-24)


### Bug Fixes

* changed commitlint settings ([50a6a39](https://github.com/alfa-laboratory/arui-scripts/commit/50a6a39))
* deleted baseUrl ([95158e3](https://github.com/alfa-laboratory/arui-scripts/commit/95158e3))
* deleted commitlint as dep ([c83af3e](https://github.com/alfa-laboratory/arui-scripts/commit/c83af3e))
* reintaling husky ([46f955c](https://github.com/alfa-laboratory/arui-scripts/commit/46f955c))
* removed recursive symlink ([f1b6459](https://github.com/alfa-laboratory/arui-scripts/commit/f1b6459))
* returned proccess.argv ([9199bb8](https://github.com/alfa-laboratory/arui-scripts/commit/9199bb8))
* trying fix build ([7c2e76b](https://github.com/alfa-laboratory/arui-scripts/commit/7c2e76b))


### Features

* add prod tsconfig ([82f91e7](https://github.com/alfa-laboratory/arui-scripts/commit/82f91e7))
* close [#59](https://github.com/alfa-laboratory/arui-scripts/issues/59) ([7f36f8b](https://github.com/alfa-laboratory/arui-scripts/commit/7f36f8b))



<a name="7.0.0"></a>
# [7.0.0](https://github.com/alfa-laboratory/arui-scripts/compare/v6.0.3...v7.0.0) (2019-12-05)



<a name="6.0.3"></a>
## [6.0.3](https://github.com/alfa-laboratory/arui-scripts/compare/v6.0.2...v6.0.3) (2019-12-04)



<a name="6.0.2"></a>
## [6.0.2](https://github.com/alfa-laboratory/arui-scripts/compare/v6.0.1...v6.0.2) (2019-12-04)


### Features

* allow override scripts settings by env ([172dc48](https://github.com/alfa-laboratory/arui-scripts/commit/172dc48))



<a name="6.0.1"></a>
## [6.0.1](https://github.com/alfa-laboratory/arui-scripts/compare/v6.0.0...v6.0.1) (2019-11-27)


### Bug Fixes

* fix css modules loader ([77cdcb3](https://github.com/alfa-laboratory/arui-scripts/commit/77cdcb3))



<a name="6.0.0"></a>
# [6.0.0](https://github.com/alfa-laboratory/arui-scripts/compare/v5.6.2...v6.0.0) (2019-11-27)


### Features

* use css modules naming convention ([836670a](https://github.com/alfa-laboratory/arui-scripts/commit/836670a))



<a name="5.6.2"></a>
## [5.6.2](https://github.com/alfa-laboratory/arui-scripts/compare/v5.6.1...v5.6.2) (2019-11-14)



<a name="5.6.1"></a>
## [5.6.1](https://github.com/alfa-laboratory/arui-scripts/compare/v5.6.0...v5.6.1) (2019-10-02)



<a name="5.6.0"></a>
# [5.6.0](https://github.com/alfa-laboratory/arui-scripts/compare/v5.5.0...v5.6.0) (2019-09-13)


### Bug Fixes

* fixed issue with shadowing path module ([b499974](https://github.com/alfa-laboratory/arui-scripts/commit/b499974))
* fix postcss webpack server config ([bbfcd53](https://github.com/alfa-laboratory/arui-scripts/commit/bbfcd53))


### Features

* additional build path ([5cc67c9](https://github.com/alfa-laboratory/arui-scripts/commit/5cc67c9))



<a name="5.5.0"></a>
# [5.5.0](https://github.com/alfa-laboratory/arui-scripts/compare/v5.4.0...v5.5.0) (2019-08-22)


### Features

* add css modules support for *.pcss files ([f927623](https://github.com/alfa-laboratory/arui-scripts/commit/f927623))



<a name="5.4.0"></a>
# [5.4.0](https://github.com/alfa-laboratory/arui-scripts/compare/v5.3.0...v5.4.0) (2019-06-28)


### Features

* **client:** remove unused measureFileSizesBeforeBuild call ([de0c68a](https://github.com/alfa-laboratory/arui-scripts/commit/de0c68a))



<a name="5.3.0"></a>
# [5.3.0](https://github.com/alfa-laboratory/arui-scripts/compare/v5.2.0...v5.3.0) (2019-06-27)



<a name="5.2.0"></a>
# [5.2.0](https://github.com/alfa-laboratory/arui-scripts/compare/v5.1.0...v5.2.0) (2019-06-25)


### Features

* **webpack.client.prod:** use TerserPlugin for minimization ([425adeb](https://github.com/alfa-laboratory/arui-scripts/commit/425adeb))



<a name="5.1.0"></a>
# [5.1.0](https://github.com/alfa-laboratory/arui-scripts/compare/v5.0.0...v5.1.0) (2019-05-30)



<a name="5.0.0"></a>
# [5.0.0](https://github.com/alfa-laboratory/arui-scripts/compare/v4.2.6...v5.0.0) (2019-04-25)


### Bug Fixes

* **postinstall:** more obvious error messages on symlink creation issues ([0e348c1](https://github.com/alfa-laboratory/arui-scripts/commit/0e348c1))


### Features

* synchronized contents of archive build with contents of docker build ([97a1fa2](https://github.com/alfa-laboratory/arui-scripts/commit/97a1fa2))
* **webpack:** remove React ProvidePlugin ([01e6b5a](https://github.com/alfa-laboratory/arui-scripts/commit/01e6b5a))



<a name="4.2.6"></a>
## [4.2.6](https://github.com/alfa-laboratory/arui-scripts/compare/v4.2.4...v4.2.6) (2019-02-28)


### Bug Fixes

* remove toLowerCase() call on argValue from docker-build ([6ee433c](https://github.com/alfa-laboratory/arui-scripts/commit/6ee433c))



<a name="4.2.5"></a>
## [4.2.5](https://github.com/alfa-laboratory/arui-scripts/compare/v4.2.4...v4.2.5) (2019-02-14)


### Bug Fixes

* remove toLowerCase() call on argValue from docker-build ([6ee433c](https://github.com/alfa-laboratory/arui-scripts/commit/6ee433c))



<a name="4.2.4"></a>
## [4.2.4](https://github.com/alfa-laboratory/arui-scripts/compare/v4.2.3...v4.2.4) (2019-01-23)


### Bug Fixes

* **test:** Comment about skipped arguments added ([ce555ce](https://github.com/alfa-laboratory/arui-scripts/commit/ce555ce))
* **test:** Fixed argument handling to test provided files only ([8711585](https://github.com/alfa-laboratory/arui-scripts/commit/8711585))



<a name="4.2.3"></a>
## [4.2.3](https://github.com/alfa-laboratory/arui-scripts/compare/v4.2.2...v4.2.3) (2019-01-17)


### Features

* **webpack-dev-server:** up version to 3.1.4 ([0be5c9f](https://github.com/alfa-laboratory/arui-scripts/commit/0be5c9f))



<a name="4.2.2"></a>
## [4.2.2](https://github.com/alfa-laboratory/arui-scripts/compare/v4.2.1...v4.2.2) (2019-01-10)


### Bug Fixes

* **dependencies:** update webpack-dev-server ([b7727c6](https://github.com/alfa-laboratory/arui-scripts/commit/b7727c6))



<a name="4.2.1"></a>
## [4.2.1](https://github.com/alfa-laboratory/arui-scripts/compare/v4.2.0...v4.2.1) (2018-12-26)


### Bug Fixes

* **postcss-config:** change extensions for postcss-custom-media plugin ([9e3a560](https://github.com/alfa-laboratory/arui-scripts/commit/9e3a560))



<a name="4.2.0"></a>
# [4.2.0](https://github.com/alfa-laboratory/arui-scripts/compare/v4.1.2...v4.2.0) (2018-12-18)


### Features

* **docker-build:** added ability to override dockerfile ([76a3a3a](https://github.com/alfa-laboratory/arui-scripts/commit/76a3a3a))



<a name="4.1.2"></a>
## [4.1.2](https://github.com/alfa-laboratory/arui-scripts/compare/v4.1.1...v4.1.2) (2018-12-10)


### Bug Fixes

* **client:** correct base path for css extractor plugin ([1195fa7](https://github.com/alfa-laboratory/arui-scripts/commit/1195fa7))



<a name="4.1.1"></a>
## [4.1.1](https://github.com/alfa-laboratory/arui-scripts/compare/v4.1.0...v4.1.1) (2018-12-06)


### Bug Fixes

* provided default value for clientPolyfillsEntry when no arui-feather is installed ([623593e](https://github.com/alfa-laboratory/arui-scripts/commit/623593e))
* **webpack-minimizer:** update webpack, disable z-index optimize ([f936b1b](https://github.com/alfa-laboratory/arui-scripts/commit/f936b1b))



<a name="4.1.0"></a>
# [4.1.0](https://github.com/alfa-laboratory/arui-scripts/compare/v4.0.3...v4.1.0) (2018-12-04)


### Features

* **browserlist:** forget dead browsers ([926bc1d](https://github.com/alfa-laboratory/arui-scripts/commit/926bc1d))



<a name="4.0.3"></a>
## [4.0.3](https://github.com/alfa-laboratory/arui-scripts/compare/v4.0.2...v4.0.3) (2018-12-04)


### Bug Fixes

* **webpack.client:** remove pathinfo from client prod build ([c2d86a3](https://github.com/alfa-laboratory/arui-scripts/commit/c2d86a3))


### Features

* **ci:** add travis ci ([9c30459](https://github.com/alfa-laboratory/arui-scripts/commit/9c30459))
* **scripts:** add install step for test project ([e834431](https://github.com/alfa-laboratory/arui-scripts/commit/e834431))



<a name="4.0.2"></a>
## [4.0.2](https://github.com/alfa-laboratory/arui-scripts/compare/v4.0.1...v4.0.2) (2018-11-23)


### Bug Fixes

* move test to other directory, fix npmignore ([73f93e4](https://github.com/alfa-laboratory/arui-scripts/commit/73f93e4))



<a name="4.0.1"></a>
## [4.0.1](https://github.com/alfa-laboratory/arui-scripts/compare/v3.0.0...v4.0.1) (2018-11-23)


### Bug Fixes

* small review fixes ([7888b6b](https://github.com/alfa-laboratory/arui-scripts/commit/7888b6b))


### Features

* add `useTscLoader` flag, fix some problems with ts compilation ([568f509](https://github.com/alfa-laboratory/arui-scripts/commit/568f509))
* migrate to webpack 4 ([acbb30b](https://github.com/alfa-laboratory/arui-scripts/commit/acbb30b))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/alfa-laboratory/arui-scripts/compare/v2.2.1...v3.0.0) (2018-11-14)


### Features

* **webpack:** ignore non-js require in node.js in node_modules ([2de1ea7](https://github.com/alfa-laboratory/arui-scripts/commit/2de1ea7))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/alfa-laboratory/arui-scripts/compare/v2.1.1...v2.2.1) (2018-10-22)


### Features

* **jest-preset:** add testURL ([374d924](https://github.com/alfa-laboratory/arui-scripts/commit/374d924))



<a name="2.1.1"></a>
## [2.1.1](https://github.com/alfa-laboratory/arui-scripts/compare/v2.1.0...v2.1.1) (2018-10-02)


### Bug Fixes

* **app-configs:** typo in serverPort ([72ea7e3](https://github.com/alfa-laboratory/arui-scripts/commit/72ea7e3))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/alfa-laboratory/arui-scripts/compare/v2.0.5...v2.1.0) (2018-09-28)



<a name="2.0.5"></a>
## [2.0.5](https://github.com/alfa-laboratory/arui-scripts/compare/v2.0.4...v2.0.5) (2018-08-23)


### Bug Fixes

* **webpack-client-prod:** keep keyframes names ([fdd4298](https://github.com/alfa-laboratory/arui-scripts/commit/fdd4298))



<a name="2.0.4"></a>
## [2.0.4](https://github.com/alfa-laboratory/arui-scripts/compare/v2.0.3...v2.0.4) (2018-08-08)


### Bug Fixes

* **app-configs:** fix baseDockerImage ([0100b06](https://github.com/alfa-laboratory/arui-scripts/commit/0100b06))



<a name="2.0.3"></a>
## [2.0.3](https://github.com/alfa-laboratory/arui-scripts/compare/v2.0.2...v2.0.3) (2018-08-06)


### Bug Fixes

* changed octal value ([40a9dfa](https://github.com/alfa-laboratory/arui-scripts/commit/40a9dfa))



<a name="2.0.2"></a>
## [2.0.2](https://github.com/alfa-laboratory/arui-scripts/compare/v2.0.1...v2.0.2) (2018-08-06)


### Bug Fixes

* remove erroneous commit ([cda07da](https://github.com/alfa-laboratory/arui-scripts/commit/cda07da))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/alfa-laboratory/arui-scripts/compare/v2.0.0...v2.0.1) (2018-08-06)


### Bug Fixes

* add file mode while writing the start.sh file ([82747cd](https://github.com/alfa-laboratory/arui-scripts/commit/82747cd))
* make start.sh executable ([0998e7b](https://github.com/alfa-laboratory/arui-scripts/commit/0998e7b))



<a name="2.0.0"></a>
# 2.0.0 (2018-08-02)


### Features

* allow to pass options with 'arui-scripts' property ([ae5f4ad](https://github.com/alfa-laboratory/arui-scripts/commit/ae5f4ad))



