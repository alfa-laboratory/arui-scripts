import fs from 'fs';
import path from 'path';
import { sync as gzipSize } from 'gzip-size';
import filesize from 'filesize';
import stripAnsi from 'strip-ansi';
import chalk from 'chalk';
import { Stats } from 'webpack';

let brotliSize: (content: Buffer) => number = () => NaN;
try {
    brotliSize = require('brotli-size').sync;
} catch (error) {
}


function canReadAsset(asset: string) {
    return (
        /\.(js|css)$/.test(asset) &&
        !/service-worker\.js/.test(asset) &&
        !/precache-manifest\.[0-9a-f]+\.js/.test(asset)
    );
}

function removeFileNameHash(fileName: string) {
    return fileName
        .replace(/\\/g, '/')
        .replace(
            /\/?(.*)(\.[0-9a-f]+)(\.chunk)?(\.js|\.css)/,
            (match, p1, p2, p3, p4) => p1 + p4
        );
}

type AssetSize = {
    name: string;
    fullName: string;
    gzipSize: number;
    brotliSize: number;
    size: number;
    sizeLabel: string;
    gzipLabel: string;
    brotliLabel: string;
};

type TotalSizes = {
    size: number;
    sizeLabel: string;
    gzipSize: number;
    gzipLabel: string;
    brotliSize: number;
    brotliLabel: string;
};

type ClientAssetsSizes = {
    totalSizes: TotalSizes;
    assets: AssetSize[];
};

export function calculateAssetsSizes(webpackStats: Stats, rootDir: string = ''): ClientAssetsSizes {
    const assetsStats = (webpackStats
        .toJson({ all: false, assets: true })
        .assets || []);

    const assets = assetsStats
        .filter(asset => canReadAsset(asset.name))
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
;

    const totalSizes: Partial<TotalSizes> = (assets || []).reduce((file, total) => {
        return {
            size: total.size + file.size,
            gzipSize: total.gzipSize + file.gzipSize,
            brotliSize: total.brotliSize + file.brotliSize
        };
    }, { size: 0, gzipSize: 0, brotliSize: 0 });

    totalSizes.sizeLabel = filesize(totalSizes.size || 0);
    totalSizes.gzipLabel = filesize(totalSizes.gzipSize || 0);
    totalSizes.brotliLabel = totalSizes.brotliSize ? filesize(totalSizes.brotliSize) : '-';

    return {
        totalSizes: totalSizes as TotalSizes,
        assets
    };
}

export function printAssetsSizes(sizes: ClientAssetsSizes) {
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

