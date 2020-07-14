function checkNodeVersion(majorVersion) {
    const actualVersion = process.versions.node.split('.');

    return parseInt(actualVersion[0], 10) >= majorVersion;
}

module.exports = checkNodeVersion;
