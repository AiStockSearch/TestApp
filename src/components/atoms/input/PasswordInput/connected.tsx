import React from 'react';

import {
  eyeIcon,
  eyeIconClosed,
} from '@/assets/register/eyes';
import colors from '@/styles/colors';

import {
  BaseTextInput,
  EyeButton,
  InputWrapper,
} from './styles';

import type {
  TextInput,
  TextInputProps,
} from 'react-native';
import { SvgXml } from 'react-native-svg';

export interface IPasswordInputProps extends Omit<
  TextInputProps,
  'onChangeText'
> {
  value: string;
  placeholder: string;
  isError?: boolean;
  isErrorText?: string | null;
  onChangeText: (text: string) => void;
  eyeAccessibilityLabel?: string;
}

export type TPasswordInputRef = {
  focus: () => void;
  clear: () => void;
  blur: () => void;
};

const DEFAULT_EYE_LABEL = 'Показать/скрыть пароль';

const PasswordInput = React.forwardRef<
  TPasswordInputRef,
  IPasswordInputProps
>(
  (
    {
      value,
      placeholder,
      isError = false,
      editable = true,
      onChangeText,
      eyeAccessibilityLabel = DEFAULT_EYE_LABEL,
    },
    ref,
  ): React.JSX.Element => {
    const [isFocused, setIsFocused] =
      React.useState<boolean>(false);
    const [isSecure, setIsSecure] =
      React.useState<boolean>(true);
    const inputRef = React.useRef<TextInput>(null);

    const handleWrapperTouch = (): void => {
      if (editable) {
        inputRef.current?.focus();
      }
    };

    const handleToggleSecure = (): void => {
      setIsSecure((previous) => !previous);
    };

    const handleFocus = (event: any): void => {
      setIsFocused(true);
      inputRef.current?.focus();
      void event;
    };

    const handleBlur = (event: any): void => {
      setIsFocused(false);
      inputRef.current?.blur();
      void event;
    };

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

    const isDisabled = !editable;
    const isNotEmpty = value !== '';

    return (
      <InputWrapper
        $isDisabled={isDisabled}
        $isError={isError}
        $isFocused={isFocused}
        onTouchStart={handleWrapperTouch}
      >
        <BaseTextInput
          ref={inputRef}
          $isError={isError}
          autoCapitalize="none"
          autoCorrect={false}
          editable={editable}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          placeholder={placeholder}
          placeholderTextColor={
            isError
              ? colors.input.error
              : colors.input.placeholder
          }
          secureTextEntry={isSecure}
          textContentType="password"
          value={value}
        />
        {isNotEmpty && editable && (
          <EyeButton
            accessibilityLabel={eyeAccessibilityLabel}
            accessibilityRole="button"
            onPress={handleToggleSecure}
          >
            <SvgXml
              height={22}
              xml={isSecure ? eyeIconClosed : eyeIcon}
              width={22}
            />
          </EyeButton>
        )}
      </InputWrapper>
    );
  },
);

export default PasswordInput;
