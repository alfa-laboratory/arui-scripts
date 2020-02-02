function getLocalIdentPattern({ isProduction }) {
    return '[folder]__[local]__[hash:base64:5]';
}

module.exports = getLocalIdentPattern;
