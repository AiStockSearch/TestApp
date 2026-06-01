import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import type { IRegistrationPayload } from '@screens/ProfileStep/types';
import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager.tsx';

import { STACK_ROUTES } from '@/navigation/routes';
import type { TRoleType } from '@/screens/RoleStep/screen';
import {
  StackActions,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import RegistrationStep from './screen';

import { useTranslation } from 'react-i18next';

export default function RegistrationStepConnected() {
  const { t } = useTranslation();
  const route = useRoute();
  const data = route.params as IRegistrationPayload;
  const navigation = useNavigation();
  const asyncStorageManager = new AsyncStorageManger(
    AsyncStorage,
  );
  const [role, setRole] =
    React.useState<TRoleType>('client');
  const userInfo = data?.profile || {};

  React.useEffect(() => {
    asyncStorageManager.getItem('role').then((role) => {
      setRole(role as unknown as TRoleType);
    });
  }, [userInfo]);

  const handleEditProfile = () => {
    navigation.dispatch(
      StackActions.replace(
        STACK_ROUTES.CREATE_PROFILE_SCREEN,
        userInfo,
      ),
    );
  };

  const handleClose = () => {
    asyncStorageManager.clearAllItems();
    navigation.dispatch(
      StackActions.replace(
        STACK_ROUTES.CREATE_PHONE_NUMBER_SCREEN,
      ),
    );
  };

  const listData = {
    ['idCardIssuedBy']: t('profileStep.document'),
    ['idCardIssueDate']: t(
      'profileStep.profileStep.datedocumentplaceholder',
    ),
    ['idCardIssuePlace']: t('profileStep.addressDocument'),
    ['idCardNumber']: t('profileStep.idCardNumber'),
    ['idCardSeries']: t('profileStep.idCardSeries'),
    ['idCardDate']: t('profileStep.idCardDate'),
    ['phone']: t('profileStep.phone'),
    ['iin']: t('profileStep.iin'),
    ['firstName']: t('profileStep.firstName'),
    ['lastName']: t('profileStep.lastName'),
    ['secondName']: t('profileStep.secondName'),
    ['birthDate']: t(
      'profileStep.profileStep.birthdayplaceholder',
    ),
    ['numberDriver']: t('profileStep.numberDriver'),
    ['dateRelease']: t(
      'profileStep.profileStep.datereleaseplaceholder',
    ),
    ['category']: t('profileStep.category'),
    ['citizenship']: t('profileStep.citizenship'),
  };

  return (
    <RegistrationStep
      userInfo={userInfo as IRegistrationPayload}
      role={role}
      listData={listData}
      actions={{
        onEdit: handleEditProfile,
        onClose: handleClose,
        onGoBack: () => {
          navigation.goBack();
        },
        onRegister: () => {
          navigation.dispatch(
            StackActions.replace(
              STACK_ROUTES.REGISTRATION,
              userInfo,
            ),
          );
        },
      }}
    />
  );
}
