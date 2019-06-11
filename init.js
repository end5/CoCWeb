const fs = require('fs');

if (!fs.existsSync('Build'))
    fs.mkdirSync('Build');

fs.copyFileSync('node_modules/requirejs/require.js', 'Build/require.js');
