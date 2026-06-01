/**
 * Единый источник правды для path-алиасов.
 * Меняйте только этот файл — Babel, Jest и TypeScript подхватят изменения.
 */
const aliases = {
  '@': './src',
  '@organism': './src/components/organism',
  '@atoms': './src/components/atoms',
  '@molecules': './src/components/molecules',
  '@components': './src/components',
  '@screens': './src/screens',
  '@navigation': './src/navigation',
  '@locales': './src/provider/locales',
  '@customhooks': './src/hooks',
  '@utils': './src/utils',
  '@fsm': './src/fsm',
  '@services': './src/services',
  '@constants': './src/constants',
  '@tests': './__tests__',
};

module.exports = aliases;
