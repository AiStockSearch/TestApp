import React, { useRef, useState } from 'react';
import { Keyboard } from 'react-native';
import { StyleSheet, TextInput } from 'react-native';

import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import {
  Cell,
  CellsContainer,
  CellText,
  Container,
} from './styled';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';

interface ISMSCodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  cellCount?: number; // По умолчанию сделаем 4 ячейки, как на макете
}

export type ISMSCodeInputRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  setIsDisabled: (isDisabled: boolean) => void;
  setIsError: (isError: boolean) => void;
};

export default React.forwardRef<
  TextInput,
  ISMSCodeInputProps
>(
  (
    { value, onChangeText, cellCount = 6 },
    ref: React.Ref<{
      focus: () => void;
      blur: () => void;
      clear: () => void;
    }> | null,
  ) => {
    const inputRef = useRef<TextInput>(null);
    const cells = Array(cellCount).fill(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const refTimeout = useRef<ReturnType<
      typeof setTimeout
    > | null>(null);
    const { t } = useTranslation();

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
      clear: () => {
        inputRef.current?.clear();
        onChangeText('');
      },
      setIsDisabled: (isDisabled: boolean) => {
        setIsDisabled(isDisabled);
      },
      setIsError: (isError: boolean) => {
        setIsError(isError);
      },
    }));

    React.useEffect(() => {
      if (isError) {
        refTimeout.current = setTimeout(() => {
          inputRef.current?.focus();
          setIsError(false);
          onChangeText('');
        }, 2000);
      }
      return () => clearTimeout(refTimeout.current);
    }, [isError]);

    React.useEffect(() => {
      if (value.length === cellCount) {
        inputRef.current?.blur();
        setIsDisabled(true);
        Keyboard.dismiss();
      }
    }, [value.length]);

    const handlePress = () => {
      inputRef.current?.focus();
    };

    const handleWrapperTouch = () => {
      inputRef.current?.focus();
      onChangeText('');
      setIsDisabled(false);
      setIsError(false);
      setIsLoading(false);
      inputRef.current?.focus();
    };

    return (
      <>
        <Container onTouchStart={handleWrapperTouch}>
          <CellsContainer onPress={handlePress}>
            {cells.map((_, index) => {
              const char = value[index] || '';
              const isFocused = index === value.length;

              return (
                <Cell
                  key={index}
                  $isFocused={isFocused}
                  $isDisabled={isDisabled}
                  $isLoading={isLoading}
                  $isError={isError}
                >
                  <CellText>{char}</CellText>
                </Cell>
              );
            })}
          </CellsContainer>
          <HiddenInput
            ref={inputRef}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            value={value}
            placeholderTextColor="transparent"
            onChangeText={(text) => {
              const cleanText = text.replace(/[^0-9]/g, '');
              if (cleanText.length <= cellCount) {
                onChangeText(cleanText);
              }
            }}
            placeholder=""
            selectionColor="transparent"
            style={{ color: 'transparent' }}
          />
        </Container>
        {isError && (
          <StyledTextDescription
            $color={colors.input.error}
            $fontSize={TextSize.small}
            $fontWeight="300"
            $letterSpacing={0.2}
            style={styles.errorText}
          >
            {t('validateForm.smsCode')}
          </StyledTextDescription>
        )}
      </>
    );
  },
);

export const HiddenInput = styled(TextInput)`
  flex: 1;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  color: transparent;
`;

const styles = StyleSheet.create({
  errorText: {
    textAlign: 'left',
  },
});
