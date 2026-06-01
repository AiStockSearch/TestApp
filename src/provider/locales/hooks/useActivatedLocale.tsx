import React from 'react';
import { AppState } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager';

import type { TUseChangeActivatedLocale } from '@locales/hooks/useChangeActivatedLocale';
import { useChangeActivatedLocale } from '@locales/hooks/useChangeActivatedLocale';
import { LocaleManager } from '@locales/repo/LocaleManager';

import type { AppStateStatus } from 'react-native';

const INITIAL_LOCALE = 'INITIAL_LOCALE';
const SYNC_WITH_SYSTEM = 'SYNC_WITH_SYSTEM';
const IDLE = 'IDLE';

const APP_STATE_ACTIVE = 'active';
const APP_STATE_BACKGROUND_MATCH = /inactive|background/;

type TStepLocale =
  | typeof INITIAL_LOCALE
  | typeof SYNC_WITH_SYSTEM
  | typeof IDLE;

type TFsmDependencies = {
  localeManager: LocaleManager | null;
  handleChangeLocale: TUseChangeActivatedLocale['handleChangeLocale'];
  setStepLocale: (step: TStepLocale | null) => void;
  setUiFreeze: (freeze: boolean) => void;
};

type TFsmState = {
  onEnter: () => Promise<void>;
};

type TFsmLocaleChange = Record<TStepLocale, TFsmState>;

const createFsmLocaleChange = (
  deps: TFsmDependencies,
): TFsmLocaleChange => ({
  [INITIAL_LOCALE]: {
    onEnter: async () => {
      deps.setUiFreeze(true);
      if (!deps.localeManager) {
        return;
      }
      const targetLocale =
        await deps.localeManager.getSupportedLocales();
      await deps.handleChangeLocale(targetLocale);
      deps.setStepLocale(IDLE);
      deps.setUiFreeze(false);
    },
  },
  [SYNC_WITH_SYSTEM]: {
    onEnter: async () => {
      if (!deps.localeManager) {
        return;
      }
      const hasUserOverridden =
        await deps.localeManager.hasUserSavedLocale();
      if (!hasUserOverridden) {
        const systemLocale =
          deps.localeManager.getSystemLocale();
        await deps.handleChangeLocale(systemLocale);
      }
      deps.setStepLocale(IDLE);
    },
  },
  [IDLE]: {
    onEnter: async () => {
      await Promise.resolve();
    },
  },
});

export const useActivatedLocale = (): {
  uiFreeze: boolean;
} => {
  const [stepLocale, setStepLocale] =
    React.useState<TStepLocale | null>(INITIAL_LOCALE);
  const [uiFreeze, setUiFreeze] =
    React.useState<boolean>(true);

  const localeManager = React.useRef(
    new LocaleManager(new AsyncStorageManger(AsyncStorage)),
  );
  const { handleChangeLocale } = useChangeActivatedLocale();
  const appState = React.useRef(AppState.currentState);

  React.useEffect(() => {
    if (stepLocale) {
      const fsm = createFsmLocaleChange({
        localeManager: localeManager.current,
        handleChangeLocale,
        setStepLocale,
        setUiFreeze,
      });

      fsm[stepLocale].onEnter().catch(console.error);
    }
  }, [stepLocale, handleChangeLocale]);

  React.useEffect(() => {
    const handleAppStateChange = (
      nextAppState: AppStateStatus,
    ) => {
      if (
        appState.current.match(
          APP_STATE_BACKGROUND_MATCH,
        ) &&
        nextAppState === APP_STATE_ACTIVE
      ) {
        setStepLocale(SYNC_WITH_SYSTEM);
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return {
    uiFreeze,
  };
};
