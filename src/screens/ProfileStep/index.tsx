import React, { useCallback, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager.tsx';

import { STACK_ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';
import type { TRoleType } from '@/screens/RoleStep/screen';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ProfileStep from './ProfileStep';
import type { IRegistrationPayload } from './types';

import { useTranslation } from 'react-i18next';

// Оптимизация: Выносим инстанс менеджера из компонента, чтобы не пересоздавать его
const asyncStorageManager = new AsyncStorageManger(
  AsyncStorage,
);

const INITIAL_DATA: IRegistrationPayload = {
  role: 'client',
  firstName: '',
  lastName: '',
  secondName: '',
  iin: '',
  birthDate: '',
  phone: '',
  document: '',
  addressDocument: '',
  dateDocument: '',
  category: '',
  numberDriver: '',
  dateRelease: '',
};

export default function ProfileStepWrapper() {
  const { t } = useTranslation();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();
  const [data, setData] =
    useState<IRegistrationPayload>(INITIAL_DATA);

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const loadData = async () => {
        const [profile, role, phone] = await Promise.all([
          asyncStorageManager.getItem('profile'),
          asyncStorageManager.getItem('role'),
          asyncStorageManager.getItem('phone'),
        ]);

        if (!isMounted) {
          return;
        }

        setData((prev) => ({
          ...prev,
          ...(profile as unknown as Partial<IRegistrationPayload>),
          ...(role ? { role: role as TRoleType } : {}),
          ...(phone ? { phone: phone } : {}),
        }));
      };

      loadData();

      return () => {
        isMounted = false;
      };
    }, []),
  );

  const translation = {
    title: t('profileStep.title'),
    description: t('profileStep.description'),
    navBarTitle: t('profileStep.navBarTitle'),
    buttonText: t('profileStep.buttonText'),
  };

  const actions = {
    onEdit: () => {
      navigation.dispatch(
        StackActions.replace(
          STACK_ROUTES.CREATE_PROFILE_SCREEN,
          data,
        ),
      );
    },
    onClose: () => {
      asyncStorageManager.clearAllItems();
      navigation.dispatch(
        StackActions.replace(
          STACK_ROUTES.CREATE_PHONE_NUMBER_SCREEN,
        ),
      );
    },
    onGoBack: () => {
      navigation.dispatch(StackActions.popToTop());
    },
    onRegister: () => {
      navigation.dispatch(
        StackActions.replace(
          STACK_ROUTES.CREATE_PROFILE_SCREEN,
          data,
        ),
      );
    },
  };

  return (
    <ProfileStep
      translation={translation}
      actions={actions}
      data={data}
    />
  );
}
