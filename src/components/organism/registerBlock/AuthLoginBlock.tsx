import React from 'react';
import { StyleSheet } from 'react-native';
import { Keyboard } from 'react-native';

import CheckBoxWrapper from '@/components/atoms/Checkbox';
import { IBox } from '@/components/atoms/IBox';
import { IButtonBlock } from '@/components/atoms/IButton';
import PhoneInput from '@/components/atoms/input/CountryInput';
import type { TPhoneInputRef } from '@/components/atoms/input/CountryInput/connected';
import PasswordInput from '@/components/atoms/input/PasswordInput';
import type { TPasswordInputRef } from '@/components/atoms/input/PasswordInput/connected';
import StyledTextDescription from '@/components/atoms/Typography';
import { useRegisterReducer } from '@/hooks/register';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';
import { validatePasswordStrength } from '@/utils/validatePasswordStrength';
const AuthLoginBlock = (deps: {
  passwordPlaceholder: string;
  phonePlaceholder: string;
  policyConfirmationPrefix: string;
  policyConfirmationLink: string;
  loginButton: string;
  handleLoginPress: (text: {
    phone: string;
    password: string;
  }) => void;
  handlePolicyPress: () => void;
  onFocus: () => void;
}) => {
  const refPhoneInput = React.useRef<TPhoneInputRef>(null);
  const refPasswordInput =
    React.useRef<TPasswordInputRef>(null);
  const {
    state,
    handleCheckboxPress,
    handlePhoneNumberChange,
    handlePasswordChange,
  } = useRegisterReducer();

  const isDisabledBtn = React.useMemo(() => {
    const validationResult = validatePasswordStrength(
      state.password,
      state.password,
    );
    if (
      validationResult.hasMinLength &&
      validationResult.hasCapitalLetter &&
      validationResult.hasLowercaseLetter &&
      validationResult.hasNumber &&
      validationResult.hasSpecialChar &&
      validationResult.match
    ) {
      if (state.checked) {
        return false;
      }
    }

    return true;
  }, [
    state.phone.digits.length,
    state.password.length,
    state.checked,
  ]);

  return (
    <IBox customStyle={authLoginStyles.block}>
      <IBox customStyle={authLoginStyles.inputs}>
        <PhoneInput
          flag="🇰🇿"
          countryCode="+7"
          placeholder="(000) 000-00-00"
          value={state.phone.masked}
          isError={false}
          editable={true}
          isErrorText={null}
          onFocus={deps.onFocus}
          onBlur={() => refPasswordInput.current?.focus()}
          onChangeText={handlePhoneNumberChange}
          ref={refPhoneInput}
          onCountryPress={() =>
            console.log('country press')
          }
        />
        <PasswordInput
          placeholder={deps.passwordPlaceholder}
          value={state.password}
          onChangeText={handlePasswordChange}
          onFocus={deps.onFocus}
          editable={true}
          isError={false}
          isErrorText={null}
          ref={refPasswordInput}
        />
      </IBox>
      <IBox customStyle={authLoginStyles.policyRow}>
        <CheckBoxWrapper
          onPress={handleCheckboxPress}
          checked={state.checked}
        >
          <StyledTextDescription
            $fontSize={TextSize.description}
            numberOfLines={2}
            ellipsizeMode="tail"
            $letterSpacing={-0.2}
            $fontWeight="600"
            style={authLoginStyles.policyText}
            $color={colors.text.secondary}
          >
            {deps.policyConfirmationPrefix}
            <StyledTextDescription
              onPress={deps.handlePolicyPress}
              suppressHighlighting
              $fontSize={TextSize.description}
              $letterSpacing={-0.2}
              $fontWeight="300"
              $color={colors.text.secondary}
              style={authLoginStyles.policyLink}
            >
              {deps.policyConfirmationLink}
            </StyledTextDescription>
          </StyledTextDescription>
        </CheckBoxWrapper>
      </IBox>
      <IButtonBlock
        title={deps.loginButton}
        isDisabled={isDisabledBtn}
        onPress={() => {
          Keyboard.dismiss();
          if (isDisabledBtn) {
            return;
          }

          deps.handleLoginPress({
            phone: ['+7', state.phone.digits].join(''),
            password: state.password,
          });
        }}
        variant="primary"
        style={authLoginStyles.loginButton}
      />
    </IBox>
  );
};

const authLoginStyles = StyleSheet.create({
  block: {
    gap: 12,
  },
  checkbox: {
    backgroundColor: colors.checkbox.background,
    borderColor: colors.checkbox.border,
    borderRadius: 4,
    borderWidth: 2,
    height: 18,
    marginTop: 2,
    width: 18,
  },
  inputs: {
    gap: 16,
    marginTop: 20,
  },
  loginButton: {
    marginBottom: 8,
  },
  policyLink: {
    textDecorationLine: 'underline',
    zIndex: 100,
  },
  policyRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  policyText: {
    flex: 1,
    flexShrink: 1,
  },
});

export default AuthLoginBlock;
