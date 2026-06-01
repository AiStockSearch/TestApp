const path = require('path');
const aliases = require('./aliases');

/** @param {Record<string, string>} aliasObj */
const generateJestMapper = (aliasObj) => {
  const mapper = {};
  Object.keys(aliasObj).forEach((key) => {
    const cleanPath = aliasObj[key].replace(/^\.\//, '');
    mapper[`^${key}/(.*)$`] = `<rootDir>/${cleanPath}/$1`;
    mapper[`^${key}$`] = `<rootDir>/${cleanPath}`;
  });
  return mapper;
};

module.exports = {
  preset: 'react-native',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node',
  ],
  moduleNameMapper: {
    '^react-native($|/.*)': `${path.dirname(require.resolve('react-native'))}/$1`,
    ...generateJestMapper(aliases),
  },
};
