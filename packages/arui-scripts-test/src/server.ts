import express from 'express';
import { readAssetsManifest } from './read-assets';
import { constObject } from './utils';

const app = express();

app.get('/', (req, res) => {
    const assets = readAssetsManifest();

    const response = `
<html>
<head>
${assets.css.map(c => `<link rel='stylesheet' href='/${c}' />`)}
</head>
<body>
<div id='app'></div>
${assets.js.map(c => `<script type='text/javascript' src='/${c}'></script>`)}
</body>
</html>
`;

    res.send(response);
});

app.listen(3000, () => {
    console.log('Test server is listening on :3000');
    console.log(constObject);
});
