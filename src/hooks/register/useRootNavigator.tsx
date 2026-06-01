import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import type { IRegistrationPayload } from '@screens/ProfileStep/types';
import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager.tsx';

import { STACK_ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';

export const useRootNavigator = () => {
  const asyncStorageManger = React.useMemo(
    () => new AsyncStorageManger(AsyncStorage),
    [],
  );

  const [initialRouteName, setInitialRouteName] = useState<
    keyof RootStackParamList
  >(
    STACK_ROUTES.CREATE_PHONE_NUMBER_SCREEN as keyof RootStackParamList,
  );
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<
    IRegistrationPayload['profile'] | null
  >(null);

  // Избавляемся от new Promise и async-executor антипаттерна
  const determineInitialRoute =
    useCallback(async (): Promise<
      keyof RootStackParamList
    > => {
      const [storedPhone, storedProfile] =
        await Promise.all([
          asyncStorageManger.getItem('phone'),
          asyncStorageManger.getItem('profile'),
        ]);

      if (storedProfile) {
        // Явно приводим тип parsed к нужному интерфейсу, убирая any
        const parsedProfile = JSON.parse(
          storedProfile,
        ) as IRegistrationPayload['profile'];
        setProfile(parsedProfile);
        return STACK_ROUTES.REGISTRATION;
      }

      if (storedPhone) {
        return STACK_ROUTES.CREATE_PROFILE_SCREEN;
      }

      return STACK_ROUTES.CREATE_PHONE_NUMBER_SCREEN;
    }, [asyncStorageManger]);

  useEffect(() => {
    setLoading(true);
    determineInitialRoute()
      .then((route) => {
        setInitialRouteName(route);
      })
      .catch((error) => {
        // Логируем реальную ошибку, если она возникнет
        console.error(
          'Failed to determine root route:',
          error,
        );
        setInitialRouteName(
          STACK_ROUTES.CREATE_PHONE_NUMBER_SCREEN,
        );
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, [determineInitialRoute]); // Убрали initialRouteName из зависимостей, чтобы избежать бесконечного цикла

  return {
    loading,
    initialRouteName,
    profile,
    setProfile,
    setInitialRouteName,
    setLoading,
  };
};
