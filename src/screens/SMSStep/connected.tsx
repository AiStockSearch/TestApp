import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager.tsx';

import { STACK_ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import CreateSMSScreen from './screen';

import { useTranslation } from 'react-i18next';

export default function CreateSMSScreenWrapper() {
  const { t } = useTranslation();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();
  const actions = {
    onSubmit: async (smsCode: string) => {
      await new AsyncStorageManger(AsyncStorage).setItem(
        'smsCode',
        smsCode,
      );
      navigation.navigate(
        STACK_ROUTES.CREATE_PROFILE_SCREEN,
      );
    },
  };
  const translation = {
    title: t('createSMS.title'),
    description: t('createSMS.description'),
    navBarTitle: t('createSMS.navBarTitle'),
    buttonText: t('createSMS.buttonText'),
  };

  return (
    <CreateSMSScreen
      translation={translation}
      actions={actions}
    />
  );
}
