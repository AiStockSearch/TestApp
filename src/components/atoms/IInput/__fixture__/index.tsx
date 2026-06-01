import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import StylesInputBox from '../index'; // Скорректируй путь к твоему файлу инпута

import styled from 'styled-components/native';
const Container = styled.View`
  backgroundcolor: ${colors.input.background};
  justifycontent: center;
  flex: 1;
  margin: 16px;
  gap: 2px;
`;
// Вспомогательный контролируемый инпут для изоляции в Cosmos
const StatefulInput = (
  props: React.ComponentProps<typeof StylesInputBox>,
) => {
  const [value, setValue] = useState<string | null>(
    props.value || '',
  );

  return (
    <StylesInputBox
      {...props}
      value={value || ''}
      onChangeText={(text) => {
        setValue(text);
        if (props.onChangeText) {
          props.onChangeText(text);
        }
      }}
    />
  );
};

export default {
  'Standard Form States': () => (
    <Container>
      <StyledTextDescription
        $fontSize={TextSize.description}
        $fontWeight="bold"
        $color={colors.text.primary}
      >
        Обычное текстовое поле
      </StyledTextDescription>
      <StatefulInput
        placeholder="Введите ваше имя..."
        placeholderTextColor={colors.input.placeholder}
        value={''}
        onChangeText={console.log}
      />

      <View style={styles.spacer} />

      <Text style={styles.label}>
        Поле для ввода пароля
      </Text>
      <StatefulInput
        placeholder="Введите пароль"
        placeholderTextColor={colors.input.placeholder}
        secureTextEntry={true}
        value={''}
        onChangeText={console.log}
      />

      <View style={styles.spacer} />

      <Text style={styles.label}>
        Цифровое поле (Номер телефона)
      </Text>
      <StatefulInput
        placeholder="+7 (999) 000-00-00"
        placeholderTextColor={colors.input.placeholder}
        keyboardType="phone-pad"
        value={'1234567890'}
        onChangeText={console.log}
      />
    </Container>
  ),
  'Autofocus & Clear Case': () => (
    <Container>
      <Text style={styles.label}>
        Инпут с автофокусом при открытии
      </Text>
      <StatefulInput
        placeholder="Сразу активен для ввода"
        placeholderTextColor={colors.input.placeholder}
        value={''}
        onChangeText={console.log}
      />
    </Container>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  label: {
    color: colors.text.link,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  spacer: {
    height: 20,
  },
});
