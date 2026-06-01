const fs = require('fs');
const path = require('path');

const aliases = require('../aliases');

const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js', '.json'];

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function resolveFile(basePath, subpath) {
  const relative = subpath ? path.join(basePath, subpath) : basePath;

  const candidates = subpath
    ? [
        ...EXTENSIONS.map((ext) => `${relative}${ext}`),
        relative,
      ]
    : [
        ...EXTENSIONS.map((ext) => path.join(relative, `index${ext}`)),
        relative,
      ];

  for (const candidate of candidates) {
    if (fileExists(candidate)) {
      return candidate;
    }
  }

  return null;
}

/**
 * Resolves path aliases (@navigation, @locales, @/…) for Metro when Babel has not rewritten them yet.
 */
function resolveAliasModule(moduleName) {
  if (aliases['@'] && moduleName.startsWith('@/')) {
    const subpath = moduleName.slice(2);
    const base = path.resolve(__dirname, '..', aliases['@']);
    return resolveFile(base, subpath);
  }

  for (const [alias, relativePath] of Object.entries(aliases)) {
    if (alias === '@') {
      continue;
    }

    const prefix = `${alias}/`;
    if (moduleName !== alias && !moduleName.startsWith(prefix)) {
      continue;
    }

    const subpath =
      moduleName === alias ? '' : moduleName.slice(prefix.length);
    const base = path.resolve(__dirname, '..', relativePath);
    const resolved = resolveFile(base, subpath);

    if (resolved) {
      return resolved;
    }
  }

  return null;
}

function createMetroAliasResolver(defaultResolveRequest) {
  return (context, moduleName, platform) => {
    const aliasFile = resolveAliasModule(moduleName);

    if (aliasFile) {
      return { type: 'sourceFile', filePath: aliasFile };
    }

    if (defaultResolveRequest) {
      return defaultResolveRequest(context, moduleName, platform);
    }

    return context.resolveRequest(context, moduleName, platform);
  };
}

module.exports = { createMetroAliasResolver, resolveAliasModule };
