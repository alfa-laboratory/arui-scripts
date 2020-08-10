const applyOverrides = require('./util/apply-overrides');

module.exports = applyOverrides(['browsers', 'supportingBrowsers'], [
    'last 2 versions',
    'ie >= 10',
    'Android >= 4',
    'iOS >= 9'
]);
