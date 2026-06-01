import React, { useRef } from 'react';

import {
  Cell,
  CellsContainer,
  CellText,
  Container,
  HiddenInput,
} from './styled';

import type { TextInput } from 'react-native';

interface ISMSCodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  cellCount?: number;
}

const DEFAULT_CELL_COUNT = 4;

const SMSCodeInput = React.forwardRef<
  TextInput,
  ISMSCodeInputProps
>(
  (
    { value, onChangeText, cellCount = DEFAULT_CELL_COUNT },
    ref: React.Ref<{
      focus: () => void;
      blur: () => void;
    }> | null,
  ): React.JSX.Element => {
    const inputRef = useRef<TextInput>(null);
    const cellKeys = Array.from(
      { length: cellCount },
      (_, index) => `cell-${index + 1}`,
    );

    React.useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
    }));

    const handlePress = (): void => {
      inputRef.current?.focus();
    };

    const handleChangeText = (text: string): void => {
      const cleanText = text.replace(/[^0-9]/g, '');
      if (cleanText.length <= cellCount) {
        onChangeText(cleanText);
      }
    };

    return (
      <Container>
        <HiddenInput
          ref={inputRef}
          autoFocus
          keyboardType="number-pad"
          onChangeText={handleChangeText}
          textContentType="oneTimeCode"
          value={value}
        />

        <CellsContainer onPress={handlePress}>
          {cellKeys.map((cellKey, index) => {
            const char = value[index] || '';
            const isFocused = index === value.length;

            return (
              <Cell
                key={cellKey}
                $isFocused={isFocused}
                $isDisabled={false}
                $isLoading={false}
                $isError={false}
              >
                <CellText>{char}</CellText>
              </Cell>
            );
          })}
        </CellsContainer>
      </Container>
    );
  },
);

export default SMSCodeInput;
