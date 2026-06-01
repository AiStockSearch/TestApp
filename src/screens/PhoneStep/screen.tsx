import React, { useState } from 'react';
import { View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager.tsx';
import { validateForm } from '@utils/validateForm';

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
import type { PhoneFsmState } from '@/fsm/phoneInputFsm';
import { useNavigationActions } from '@/hooks/register/useNavigationAction';
import colors from '@/styles/colors';
import FSMChangeTextManager from '@/utils/FSMPattern';
import { useFocusEffect } from '@react-navigation/native';

import type { TextInput } from 'react-native';

interface PhoneStepProps {
  initialPhoneState: PhoneFsmState;
  translation: {
    navBarTitle: string;
    title: string;
    description: string;
    buttonText: string;
    placeholder: string;
    label: string;
  };
  actions: {
    onSubmit: (phone: string) => void;
  };
}

export default function PhoneStepScreen({
  initialPhoneState,
  translation,
  actions,
}: PhoneStepProps) {
  const refPhoneInput = React.useRef<TextInput>(null);
  const [phoneState, setPhoneState] =
    useState<PhoneFsmState>(initialPhoneState);
  const asyncStorageManger = new AsyncStorageManger(
    AsyncStorage,
  );
  const refTempPhoneInput = React.useRef<string>(
    phoneState?.digits || '',
  );
  const navigationActions = useNavigationActions({
    onBack: undefined,
    onClose: undefined,
  });

  const validator = validateForm.phoneRegex.test(
    phoneState?.masked || '',
  );

  useFocusEffect(
    React.useCallback(() => {
      asyncStorageManger.getItem('phone').then((phone) => {
        if (phone) {
          setPhoneState(
            FSMChangeTextManager.changePhone(
              phone,
              phoneState,
            ),
          );
          refPhoneInput.current?.focus();
        }
      });
    }, []),
  );

  const handleChangePhone = (text: string) => {
    refTempPhoneInput.current = phoneState.digits;
    const phone = FSMChangeTextManager.changePhone(
      text,
      phoneState,
    );
    setPhoneState(phone);
  };

  const refContainerBlock = React.useRef<{
    scrollTo: (y: number) => void;
    scrollToEnd: () => void;
  }>({
    scrollTo: () => {},
    scrollToEnd: () => {},
  });

  return (
    <ContainerBlock
      ref={refContainerBlock}
      actions={navigationActions}
      translation={translation}
      progressBarActive={[true, false, false, false]}
    >
      <HeaderBlock>
        <Title>{translation?.title}</Title>
        <Description>
          {translation?.description}
        </Description>
      </HeaderBlock>

      <KeyboardAwareAnchor
        extraOffset={12}
        onTouchStart={() => refPhoneInput.current?.focus()}
        scrollTo={(e) =>
          refContainerBlock.current?.scrollTo(e.y)
        }
      >
        {(coordY) => (
          <View style={{ marginBottom: 16 }}>
            <FloatingLabelInput
              label={
                translation?.label?.toUpperCase() || ''
              }
              placeholder={translation.placeholder}
              value={phoneState?.masked || ''}
              onChangeText={handleChangePhone}
              placeholderTextColor={
                colors.input.placeholder
              }
              keyboardType="phone-pad"
              ref={refPhoneInput}
              onFocus={() =>
                refContainerBlock.current?.scrollTo(coordY)
              }
            />
          </View>
        )}
      </KeyboardAwareAnchor>

      <FooterBlock>
        <IButtonBlock
          isDisabled={!validator}
          title={translation.buttonText}
          onPress={() =>
            actions.onSubmit(phoneState.digits)
          }
          variant="primary"
        />
      </FooterBlock>
    </ContainerBlock>
  );
}
