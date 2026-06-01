import type { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager';

import type { TSupportedLocales } from '@locales/core/i18n';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
} from '@locales/core/i18n';

import * as RNLocalize from 'react-native-localize';

export class LocaleManager {
  private readonly STORAGE_KEY = '@app:locale';

  constructor(
    private readonly asyncStorageManger: AsyncStorageManger,
  ) {}

  private resolveSupportedLocale(
    raw: string | null | undefined,
  ): TSupportedLocales {
    if (raw === null || raw === undefined || raw === '') {
      return DEFAULT_LOCALE;
    }

    const code = raw.split('-')[0]?.toLowerCase() ?? '';

    if (
      (SUPPORTED_LOCALES as readonly string[]).includes(
        code,
      )
    ) {
      return code as TSupportedLocales;
    }

    return DEFAULT_LOCALE;
  }

  public async getActivatedLocale(): Promise<TSupportedLocales> {
    const saved = await this.asyncStorageManger.getItem(
      this.STORAGE_KEY,
    );

    return this.resolveSupportedLocale(saved);
  }

  public async setActivatedLocale(
    locale: TSupportedLocales,
  ): Promise<void> {
    await this.asyncStorageManger.setItem(
      this.STORAGE_KEY,
      locale,
    );
  }

  public getSystemLocale(): TSupportedLocales {
    try {
      const locales = RNLocalize.getLocales();
      const first = locales[0];

      if (first !== undefined) {
        return this.resolveSupportedLocale(
          first.languageCode ?? first.languageTag,
        );
      }

      return DEFAULT_LOCALE;
    } catch (error) {
      console.error(
        '[LocaleManager] Ошибка получения системной локали:',
        error,
      );
      return DEFAULT_LOCALE;
    }
  }

  public async getSupportedLocales(): Promise<TSupportedLocales> {
    if (await this.hasUserSavedLocale()) {
      const saved = await this.asyncStorageManger.getItem(
        this.STORAGE_KEY,
      );
      return this.resolveSupportedLocale(saved);
    }

    return this.getSystemLocale();
  }

  public async hasUserSavedLocale(): Promise<boolean> {
    try {
      const saved = await this.asyncStorageManger.getItem(
        this.STORAGE_KEY,
      );
      return saved !== null && saved !== '';
    } catch (error) {
      console.error(
        '[LocaleManager] Ошибка проверки сохраненной локали:',
        error,
      );
      return false;
    }
  }
}
