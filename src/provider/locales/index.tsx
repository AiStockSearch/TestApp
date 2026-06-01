import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager';

import i18n from '@locales/core/i18n';
import { useActivatedLocale } from '@locales/hooks/useActivatedLocale';
import { useChangeActivatedLocale } from '@locales/hooks/useChangeActivatedLocale';
import { LocalesProvider } from '@locales/provider';
import { LocaleManager } from '@locales/repo/LocaleManager';

export const LocalesManager = {
  hooks: {
    useActivatedLocale,
    useChangeActivatedLocale,
  },
  repo: {
    localeManager: LocaleManager,
    asyncStorageManger: AsyncStorageManger,
  },
  core: {
    i18n,
  },
  provider: {
    localesProvider: LocalesProvider,
  },
};

export type TLocalesManager = typeof LocalesManager;
export type TLocalesManagerHooks = TLocalesManager['hooks'];
export type TLocalesManagerRepo = TLocalesManager['repo'];
export type TLocalesManagerCore = TLocalesManager['core'];
export type TLocalesManagerProvider =
  TLocalesManager['provider'];
