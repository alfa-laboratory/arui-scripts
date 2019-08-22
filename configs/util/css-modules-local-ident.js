function getLocalIdentPattern({ isProduction }) {
    return '[name]__[local]__[hash:base64:5]';
}

module.exports = getLocalIdentPattern;
