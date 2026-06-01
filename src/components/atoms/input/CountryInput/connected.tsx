import React from 'react';
import { StyleSheet, View } from 'react-native';

import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import {
  ArrowIcon,
  BaseTextInput,
  ClearButton,
  ClearIconCircle,
  ClearText,
  CountryCodeText,
  CountrySelectButton,
  FlagText,
  InputWrapper,
} from './styles';

import type {
  TextInput,
  TextInputProps,
} from 'react-native';

interface IPhoneInputProps extends Omit<
  TextInputProps,
  'onChangeText'
> {
  flag: string;
  countryCode: string;
  value: string;
  placeholder: string;
  isError?: boolean;
  isErrorText?: string | null;
  onChangeText: (text: string) => void;
  onCountryPress?: () => void;
}

export type TPhoneInputRef = {
  focus: () => void;
  clear: () => void;
  blur: () => void;
};

const CountryInput = React.forwardRef<
  TPhoneInputRef,
  IPhoneInputProps
>(
  (
    {
      flag,
      countryCode,
      value,
      placeholder,
      isError = false,
      isErrorText = null,
      editable = true,
      onFocus,
      onBlur,
      onChangeText,
      onCountryPress,
    },
    ref,
  ): React.JSX.Element => {
    const inputRef = React.useRef<TextInput>(null);
    const [isFocused, setIsFocused] = React.useState(false);

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      clear: () => {
        inputRef.current?.clear();
        onChangeText('');
      },
      blur: () => {
        inputRef.current?.blur();
      },
    }));

    const handleWrapperTouch = (): void => {
      if (editable) {
        inputRef.current?.focus();
      }
    };

    const handleClearPress = (): void => {
      onChangeText('');
      inputRef.current?.focus();
    };

    // Используем типизацию самой пропсы TextInputProps для полной совместимости
    const handleFocus: TextInputProps['onFocus'] = (
      event,
    ) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur: TextInputProps['onBlur'] = (
      event,
    ) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const isNotEmpty = value !== '';
    const isDisabled = !editable;

    return (
      <View style={styles.container}>
        <InputWrapper
          $isDisabled={isDisabled}
          $isError={isError}
          $isFocused={isFocused}
          onTouchStart={handleWrapperTouch}
        >
          <CountrySelectButton
            disabled={!onCountryPress && !editable}
            onPress={onCountryPress}
          >
            <FlagText>{flag}</FlagText>
            <CountryCodeText>{countryCode}</CountryCodeText>
            {Boolean(onCountryPress) && (
              <ArrowIcon>▼</ArrowIcon>
            )}
          </CountrySelectButton>

          <BaseTextInput
            ref={inputRef}
            $isError={isError}
            editable={editable}
            keyboardType="numeric"
            maxLength={15}
            onBlur={handleBlur}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            placeholder={placeholder}
            placeholderTextColor={
              isError
                ? colors.input.error
                : colors.input.placeholder
            }
            accessibilityLabel="Ввод номера телефона"
            value={value}
          />

          {isNotEmpty && editable && (
            <ClearButton
              accessibilityLabel="Очистить поле ввода"
              onPress={handleClearPress}
            >
              <ClearIconCircle>
                <ClearText>✕</ClearText>
              </ClearIconCircle>
            </ClearButton>
          )}
        </InputWrapper>
        {isError && isErrorText && (
          <StyledTextDescription
            $color={colors.input.error}
            $fontSize={TextSize.small}
            $fontWeight="300"
            $letterSpacing={0.2}
          >
            {isErrorText}
          </StyledTextDescription>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    gap: 4,
    position: 'relative',
  },
});

export { CountryInput as PhoneInput };
export default CountryInput;
