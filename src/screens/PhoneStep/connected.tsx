import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager.tsx';

import { MASKED_INPUT_PHASE_TYPES } from '@/fsm/maskedInputFsm';
import type { PhoneFsmState } from '@/fsm/phoneInputFsm';
import { STACK_ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import PhoneStepScreen from './screen';

import { useTranslation } from 'react-i18next';

export default function PhoneStepScreenWrapper() {
  const [phoneState, setPhoneState] =
    useState<PhoneFsmState>({
      masked: '',
      phase: MASKED_INPUT_PHASE_TYPES.EMPTY,
      digits: '',
    });
  const { t } = useTranslation();
  const asyncStorageManger = new AsyncStorageManger(
    AsyncStorage,
  );
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();

  useFocusEffect(
    React.useCallback(() => {
      asyncStorageManger.getItem('phone').then((phone) => {
        if (phone) {
          setPhoneState({
            masked: phone,
            phase: MASKED_INPUT_PHASE_TYPES.EMPTY,
            digits: '',
          });
        }
      });
    }, []),
  );

  const actions = {
    onSubmit: async (phone: string) => {
      await new AsyncStorageManger(AsyncStorage).setItem(
        'phone',
        phone,
      );
      navigation.navigate(
        STACK_ROUTES.SELECT_ROLE_SCREEN as any,
      );
    },
  };
  const translation = {
    navBarTitle: t('phoneStep.navBarTitle'),
    title: t('phoneStep.title'),
    description: t('phoneStep.description'),
    buttonText: t('phoneStep.buttonText'),
    placeholder: t('phoneStep.placeholder'),
    label: t('phoneStep.label'),
  };

  return (
    <PhoneStepScreen
      initialPhoneState={phoneState}
      actions={actions}
      translation={translation}
    />
  );
}
