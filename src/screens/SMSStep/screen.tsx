import React, { useRef, useState } from 'react';

import { IButtonBlock } from '@/components/atoms/IButton';
import type { ISMSCodeInputRef } from '@/components/atoms/input/SmsCodeInput/connected';
import SMSCodeInput from '@/components/atoms/input/SmsCodeInput/connected';
import {
  Description,
  FooterBlock,
  HeaderBlock,
  Title,
} from '@/components/atoms/styled';
import { ContainerBlock } from '@/components/molecules/registerBlock/ContainerBlock';
import { useNavigationActions } from '@/hooks/register/useNavigationAction';
import { useSmsSendCode } from '@/hooks/register/useSmsSendCode';
import type { RootStackParamList } from '@/navigation/types';
import {
  StackActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { ScrollView, TextInput } from 'react-native';

const SUCCESS_CODE = '123456';

export default function CreateSMSScreen({
  translation,
  actions,
}: {
  translation: {
    title: string;
    description: string;
    navBarTitle: string;
    buttonText: string;
  };
  actions: {
    onSubmit: (smsCode: string) => void;
  };
}): React.JSX.Element {
  const refContainerBlock = useRef<ScrollView>(null);
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();
  const navigationActions = useNavigationActions({
    onBack: () => navigation.dispatch(StackActions.pop()),
    onClose: undefined,
  });

  const refSMSCodeInput = useRef<ISMSCodeInputRef | null>(
    null,
  );
  const [smsCode, setSMSCode] = useState('');
  const { timer, handleTimerStarted } = useSmsSendCode();

  const buttonBlocked = React.useMemo(() => {
    let blocked = false;
    if (timer > 1) {
      blocked = true;
    }
    return blocked;
  }, [smsCode.length, timer]);

  useFocusEffect(
    React.useCallback(() => {
      setSMSCode('');
      handleTimerStarted();
      refSMSCodeInput.current?.focus();
    }, []),
  );

  React.useEffect(() => {
    if (smsCode.length === 6 && smsCode === SUCCESS_CODE) {
      actions.onSubmit(smsCode);
    } else if (
      smsCode.length === 6 &&
      smsCode !== SUCCESS_CODE
    ) {
      refSMSCodeInput.current?.setIsError(true);
      refSMSCodeInput.current?.focus();
    }
  }, [actions, smsCode]);

  const btnTimerNaming = React.useMemo(() => {
    if (timer === 0) {
      return translation.buttonText;
    }
    return [
      translation.buttonText,
      ' (00:',
      timer < 10 ? '0' + timer : timer,
      ')',
    ].join('');
  }, [timer, translation.buttonText]);

  return (
    <ContainerBlock
      ref={refContainerBlock}
      actions={navigationActions}
      translation={translation}
      progressBarActive={[true, true, true, false]}
    >
      <HeaderBlock>
        <Title>{translation.title}</Title>
        <Description>{translation.description}</Description>
      </HeaderBlock>

      <SMSCodeInput
        value={smsCode}
        onChangeText={setSMSCode}
        ref={
          refSMSCodeInput as unknown as React.RefObject<TextInput>
        }
      />
      <FooterBlock>
        <IButtonBlock
          isDisabled={buttonBlocked}
          title={btnTimerNaming}
          onPress={handleTimerStarted}
          variant={timer <= 10 ? 'primary' : 'outline'}
        />
      </FooterBlock>
    </ContainerBlock>
  );
}
