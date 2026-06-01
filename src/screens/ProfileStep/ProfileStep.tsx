import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager';

import { IButtonBlock } from '@/components/atoms/IButton';
import FloatingLabelInput from '@/components/atoms/IInput';
import { KeyboardAwareAnchor } from '@/components/atoms/KeyboardAnchoar';
import {
  Description,
  FooterBlock,
  HeaderBlock,
  Title,
} from '@/components/atoms/styled';
import { ContainerBlock } from '@/components/molecules/registerBlock/ContainerBlock';
import { useNavigationActions } from '@/hooks/register/useNavigationAction';
import { useValidateForm } from '@/hooks/register/validateProfileForm';
import { STACK_ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';
import colors from '@/styles/colors';
import type { ProfileValidationSchema } from '@/utils/validateForm/index';
import {
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import * as KEYS from './constants';
import {
  INITIAL_REDUCER_STATE,
  profileReducer,
} from './profileReducer';
import type {
  ProfileFormState,
  ProfileStepProps,
} from './types';
import type { IRegistrationPayload } from './types';

import { useTranslation } from 'react-i18next';

export const visibleInputs = (
  data: IRegistrationPayload,
) => {
  if (data.role === 'carrier') {
    return [
      ...KEYS.BASE_INPUT_LIST,
      KEYS.NUMBER_DRIVER,
      KEYS.CATEGORY,
      KEYS.DATE_RELEASE,
    ];
  }
  return KEYS.BASE_INPUT_LIST;
};

export default function ProfileStep({
  data,
  translation,
}: ProfileStepProps) {
  const { t } = useTranslation();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();
  const refContainerBlock = useRef<{
    scrollTo: (y: number) => void;
  }>(null);

  const route = useRoute();
  const profile = route.params as {
    profile: IRegistrationPayload['profile'];
  };

  const [state, dispatch] = React.useReducer(
    profileReducer,
    { ...(profile || INITIAL_REDUCER_STATE) },
  );

  const asyncStorageManager = new AsyncStorageManger(
    AsyncStorage,
  );

  useFocusEffect(
    useCallback(() => {
      asyncStorageManager.getItem('phone').then((phone) => {
        if (phone) {
          dispatch({ type: KEYS.PHONE, payload: phone });
        }
      });
    }, []),
  );

  const { errorMessages } = useValidateForm(
    state as ProfileFormState & IRegistrationPayload,
  );

  const navigationActions = useNavigationActions({
    onBack: undefined,
    onClose: undefined,
  });

  const handleChangeData = useCallback(
    (type: string) => (payload: string) => {
      dispatch({ type, payload });
    },
    [],
  );

  const locales = useMemo(
    () => ({
      [KEYS.FIRST_NAME]: t('profileStep.firstname'),
      [KEYS.LAST_NAME]: t('profileStep.lastname'),
      [KEYS.SECOND_NAME]: t('profileStep.secondname'),
      [KEYS.CITIZENSHIP]: t('profileStep.citizenship'),
      [KEYS.IIN]: t('profileStep.iin'),
      [KEYS.BIRTHDAY]: t(
        'profileStep.profileStep.birthdayplaceholder',
      ),
      [KEYS.PHONE]: t('profileStep.phone'),
      [KEYS.DOCUMENT]: t('profileStep.document'),
      [KEYS.ADDRESS_DOCUMENT]: t(
        'profileStep.adressdocument',
      ),
      [KEYS.DATE_DOCUMENT]: t(
        'profileStep.profileStep.datedocumentplaceholder',
      ),
      [KEYS.CATEGORY]: t('profileStep.category'),
      [KEYS.NUMBER_DRIVER]: t('profileStep.numberdriver'),
      [KEYS.DATE_RELEASE]: t('profileStep.daterelease'),
    }),
    [t],
  );

  // Оптимизация: Плейсхолдеры мемоизированы
  const placeholders = useMemo(
    () => ({
      ...locales,
      [KEYS.PHONE]: t('profileStep.phoneplaceholder'),
      [KEYS.DATE_DOCUMENT]: t(
        'profileStep.profileStep.datedocumentplaceholder',
      ),
      [KEYS.BIRTHDAY]: t(
        'profileStep.profileStep.birthdayplaceholder',
      ),
      [KEYS.DATE_RELEASE]: t(
        'profileStep.profileStep.datereleaseplaceholder',
      ),
    }),
    [locales, t],
  );

  const typeKeyboard = {
    [KEYS.PHONE]: 'phone-pad',
    [KEYS.IIN]: 'numeric',
    [KEYS.NUMBER_DRIVER]: 'numeric',
    [KEYS.DATE_RELEASE]: 'numeric',
    [KEYS.DATE_DOCUMENT]: 'numeric',
    [KEYS.BIRTHDAY]: 'numeric',
  };

  const handleSubmit = useCallback(() => {
    asyncStorageManager.setItem(
      'profile',
      JSON.stringify(state),
    );
    navigation.dispatch(
      StackActions.replace(STACK_ROUTES.REGISTRATION, {
        profile: state,
      }),
    );
  }, [state]);

  const handleRegister = useCallback(() => {
    navigation.dispatch(
      StackActions.replace(STACK_ROUTES.REGISTRATION, {
        profile: state,
      }),
    );
  }, [state]);
  const handleClose = useCallback(() => {
    new AsyncStorageManger(AsyncStorage).clearAllItems();
    if (!navigation.canGoBack()) {
      navigation.replace(
        STACK_ROUTES.CREATE_PHONE_NUMBER_SCREEN,
      );
    }

    navigation.dispatch(StackActions.popToTop());
  }, [navigation]);

  return (
    <ContainerBlock
      ref={refContainerBlock}
      actions={navigationActions}
      translation={translation}
      withoutTab={!!profile}
      progressBarActive={[true, true, true, true]}
    >
      <HeaderBlock>
        <Title>
          {t('profileStep.title', {
            role:
              data.role === 'carrier'
                ? t('roleStep.carrierRoleTitle')
                : t('roleStep.clientRoleTitle'),
          })}
        </Title>
        <Description>
          {t('profileStep.description', {
            role:
              data.role === 'carrier'
                ? t('roleStep.carrierRoleTitle')
                : t('roleStep.clientRoleTitle'),
          })}
        </Description>
      </HeaderBlock>

      <View style={styles.roleContainer}>
        <Text style={styles.label}>
          {t('roleStep.title').toUpperCase()}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {data.role === 'carrier'
              ? t('roleStep.carrierRoleTitle')
              : t('roleStep.clientRoleTitle')}
          </Text>
        </View>
      </View>

      {visibleInputs(data).map((name) => {
        const fieldValue =
          state[name as keyof ProfileFormState];
        const displayValue =
          fieldValue && typeof fieldValue === 'object'
            ? fieldValue.masked
            : (fieldValue as string) || '';

        const isNumericKeyboard =
          typeKeyboard[name as keyof typeof typeKeyboard];
        const disabledPhone = name === KEYS.PHONE;

        return (
          <KeyboardAwareAnchor
            key={name}
            scrollTo={(e) =>
              refContainerBlock.current?.scrollTo(e.y)
            }
            extraOffset={50}
            style={styles.inputWrapper}
          >
            {(coordY) => (
              <>
                {KEYS.NUMBER_DRIVER === name && (
                  <HeaderBlock>
                    <Title>
                      {t('roleStep.carrierRoleTitle')}
                    </Title>
                    <Description>
                      {t('roleStep.carrierRoleDescription')}
                    </Description>
                  </HeaderBlock>
                )}
                <FloatingLabelInput
                  name={name}
                  isDisabled={disabledPhone}
                  label={
                    locales[
                      name as keyof typeof locales
                    ]?.toUpperCase() || ''
                  }
                  value={displayValue}
                  onChangeText={handleChangeData(name)}
                  placeholder={
                    placeholders[
                      name as keyof typeof placeholders
                    ] || ''
                  }
                  placeholderTextColor={
                    colors.input.placeholder
                  }
                  keyboardType={
                    isNumericKeyboard
                      ? 'numeric'
                      : 'default'
                  }
                  onFocus={() =>
                    refContainerBlock.current?.scrollTo(
                      coordY,
                    )
                  }
                  isError={
                    displayValue.length > 1 &&
                    !!errorMessages?.[
                      name as keyof Partial<ProfileValidationSchema>
                    ]
                  }
                  errorMessage={t(
                    `${errorMessages?.[name as keyof Partial<ProfileValidationSchema>]}`,
                  )}
                />
              </>
            )}
          </KeyboardAwareAnchor>
        );
      })}

      <View style={styles.spacer} />

      <FooterBlock style={{ gap: 16 }}>
        {profile && (
          <IButtonBlock
            title={t('profileStep.buttonEdit')}
            onPress={handleSubmit}
            variant="primary"
          />
        )}
        {!profile && (
          <IButtonBlock
            isDisabled={visibleInputs(data).some((name) =>
              Boolean(
                errorMessages?.[
                  name as keyof Partial<ProfileValidationSchema>
                ],
              ),
            )}
            title={t('profileStep.buttonRegister')}
            onPress={handleRegister}
            variant="primary"
          />
        )}
        <IButtonBlock
          variant="outline"
          title={t('profileStep.buttonClose')}
          onPress={handleClose}
        />
      </FooterBlock>
    </ContainerBlock>
  );
}

const styles = StyleSheet.create({
  roleContainer: { marginBottom: 16 },
  badge: {
    backgroundColor: colors.background.secondary,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: colors.input.border,
  },
  badgeText: {
    color: colors.text.primary,
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.text.secondary,
    letterSpacing: 0.5,
    marginBottom: 6,
    marginLeft: 4,
  },
  inputWrapper: { marginVertical: 8 },
  spacer: { height: 32 },
});
