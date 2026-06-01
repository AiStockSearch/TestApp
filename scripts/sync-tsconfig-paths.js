const fs = require('fs');
const path = require('path');

const aliases = require('../aliases');

const root = path.resolve(__dirname, '..');
const outPath = path.join(root, 'tsconfig.paths.json');

const tsPaths = {};
Object.keys(aliases).forEach((key) => {
  const cleanPath = aliases[key].replace(/^\.\//, '');
  tsPaths[`${key}/*`] = [`${cleanPath}/*`];
  tsPaths[key] = [cleanPath];
});

const config = {
  compilerOptions: {
    baseUrl: '.',
    paths: tsPaths,
  },
};

fs.writeFileSync(outPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');
console.log('✅ tsconfig.paths.json обновлён из aliases.js');
