const fs = require('fs');
const path = require('path');
const gzipSize = require('gzip-size').sync;
const filesize = require('filesize');
const stripAnsi = require('strip-ansi');
const chalk = require('chalk');

let brotliSize = () => NaN;
try {
    brotliSize = require('brotli-size').sync;
} catch (error) {
}


function canReadAsset(asset) {
    return (
        /\.(js|css)$/.test(asset) &&
        !/service-worker\.js/.test(asset) &&
        !/precache-manifest\.[0-9a-f]+\.js/.test(asset)
    );
}

function removeFileNameHash(fileName) {
    return fileName
        .replace(/\\/g, '/')
        .replace(
            /\/?(.*)(\.[0-9a-f]+)(\.chunk)?(\.js|\.css)/,
            (match, p1, p2, p3, p4) => p1 + p4
        );
}

function calculateAssetsSizes(webpackStats, rootDir) {
    const assets = (webpackStats.stats || [webpackStats])
        .map(stats =>
            stats
                .toJson({ all: false, assets: true })
                .assets.filter(asset => canReadAsset(asset.name))
                .map(asset => {
                    const fileContents = fs.readFileSync(path.join(rootDir, asset.name));
                    const size = gzipSize(fileContents);
                    const brSize = brotliSize(fileContents);
                    const filename = path.basename(asset.name);

                    return {
                        name: removeFileNameHash(filename),
                        fullName: filename,
                        gzipSize: size,
                        brotliSize: brSize,
                        size: asset.size,
                        sizeLabel: filesize(asset.size),
                        gzipLabel: filesize(size),
                        brotliLabel: brSize ? filesize(brSize) : '-'
                    };
                })
        )
        .reduce((single, all) => all.concat(single), []);

    const totalSizes = assets.reduce((file, total) => {
        return {
            size: total.size + file.size,
            gzipSize: total.gzipSize + file.gzipSize,
            brotliSize: total.brotliSize + file.brotliSize
        };
    }, { size: 0, gzipSize: 0, brotliSize: 0 });

    totalSizes.sizeLabel = filesize(totalSizes.size);
    totalSizes.gzipLabel = filesize(totalSizes.gzipSize);
    totalSizes.brotliLabel = totalSizes.brotliSize ? filesize(totalSizes.brotliSize) : '-';

    return {
        totalSizes,
        assets
    };
}

function printAssetsSizes(sizes) {
    const longestSizeLabelLength = Math.max.apply(
        null,
        sizes.assets.map(a => stripAnsi(a.gzipLabel).length + stripAnsi(a.sizeLabel).length + 8)
    );

    console.log(chalk.blueBright('Assets sizes:'));

    sizes.assets.forEach(asset => {
        let sizeLabel = `${asset.sizeLabel} (${asset.gzipLabel} gzip, ${asset.brotliLabel} br)`;
        const sizeLength = stripAnsi(sizeLabel).length;

        if (sizeLength < longestSizeLabelLength) {
            const rightPadding = ' '.repeat(longestSizeLabelLength - sizeLength);
            sizeLabel += rightPadding;
        }

        console.log(
            '  ' +
            sizeLabel +
            '  ' +
            chalk.cyan(asset.name)
        );
    });

    console.log(
        chalk.blueBright('\nTotal size:\n') +
        `  ${sizes.totalSizes.sizeLabel} (${sizes.totalSizes.gzipLabel} gzip, ${sizes.totalSizes.brotliLabel} br)\n`
    );
}

module.exports = {
    calculateAssetsSizes,
    printAssetsSizes
};
