// src/core/localization/i18n.ts
import en from '../translations/en';
import ru from '../translations/ru';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export type TSupportedLocales = 'ru' | 'en';
export const SUPPORTED_LOCALES: TSupportedLocales[] = [
  'ru',
  'en',
];
export const DEFAULT_LOCALE: TSupportedLocales = 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    lng: DEFAULT_LOCALE, // Начальный язык, хук его переопределит
    fallbackLng: DEFAULT_LOCALE,
    interpolation: { escapeValue: false },
  })
  .catch(console.error);

export default i18n;
