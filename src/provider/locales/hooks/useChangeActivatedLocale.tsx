import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager';

import type { TSupportedLocales } from '@locales/core/i18n';
import i18n from '@locales/core/i18n';
import { LocaleManager } from '@locales/repo/LocaleManager';

export type TUseChangeActivatedLocale = {
  handleChangeLocale: (
    newLocale: TSupportedLocales,
  ) => Promise<void>;
  lang: TSupportedLocales;
  uiFreeze: boolean;
};

export const useChangeActivatedLocale =
  (): TUseChangeActivatedLocale => {
    const localeManagerRef = React.useRef(
      new LocaleManager(
        new AsyncStorageManger(AsyncStorage),
      ),
    );
    const [uiFreeze, setUiFreeze] =
      React.useState<boolean>(false);
    const [lang, setLang] =
      React.useState<TSupportedLocales>('ru');

    React.useEffect(() => {
      localeManagerRef.current
        .getActivatedLocale()
        .then((locale) => {
          setLang(locale);
        });
    }, []);

    const handleChangeLocale = React.useCallback(
      async (newLocale: TSupportedLocales) => {
        setUiFreeze(true);
        newLocale = lang === 'ru' ? 'en' : 'ru';
        try {
          await localeManagerRef.current.setActivatedLocale(
            newLocale,
          );
          await i18n.changeLanguage(newLocale);
          setLang(newLocale);
        } catch (error) {
          console.error(
            '[LocaleHook] Ошибка смены языка:',
            error,
          );
        } finally {
          setUiFreeze(false);
        }
      },
      [lang],
    );

    return {
      handleChangeLocale,
      lang,
      uiFreeze,
    };
  };
