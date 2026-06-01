const path = require('path');

const {
  getDefaultConfig,
  mergeConfig,
} = require('@react-native/metro-config');

const aliases = require('./aliases');
const {
  createMetroAliasResolver,
} = require('./scripts/metroAliasResolver');

const defaultConfig = getDefaultConfig(__dirname);

const extraNodeModules = Object.fromEntries(
  Object.entries(aliases).map(([alias, relativePath]) => [
    alias,
    path.resolve(__dirname, relativePath),
  ]),
);

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    extraNodeModules,
    resolveRequest: createMetroAliasResolver(
      defaultConfig.resolver.resolveRequest,
    ),
  },
};

module.exports = mergeConfig(defaultConfig, config);
