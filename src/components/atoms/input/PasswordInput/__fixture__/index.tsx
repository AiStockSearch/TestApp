import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import PasswordInput from '../connected'; // Проверь относительный путь

const StatefulPasswordCard = ({
  placeholder,
  initialValue = '',
  isError = false,
  isErrorText = null,
  editable = true,
}: {
  placeholder: string;
  initialValue?: string;
  isError?: boolean;
  isErrorText?: string | null;
  editable?: boolean;
}) => {
  const [password, setPassword] = useState(initialValue);

  return (
    <View style={styles.card}>
      <PasswordInput
        value={password}
        placeholder={placeholder}
        onChangeText={setPassword}
        isError={isError}
        isErrorText={isErrorText}
        editable={editable}
      />
    </View>
  );
};

export default {
  'Password Input States': () => (
    <View style={styles.container}>
      <StyledTextDescription
        $fontSize={TextSize.description}
        $fontWeight="700"
        $color={colors.text.primary}
      >
        1. Enabled / Empty (Лейбл по центру)
      </StyledTextDescription>
      <StatefulPasswordCard
        placeholder="Придумайте пароль"
        initialValue=""
      />

      <StyledTextDescription
        $fontSize={TextSize.description}
        $fontWeight="700"
        $color={colors.text.primary}
      >
        2. Filled State (Глазик скрывает/показывает)
      </StyledTextDescription>
      <StyledTextDescription
        $fontSize={TextSize.description}
        $fontWeight="300"
        $color={colors.text.secondary}
      >
        Нажмите на иконку глаза справа, чтобы переключить
        маскирование текста
      </StyledTextDescription>
      <StatefulPasswordCard
        placeholder="Текущий пароль"
        initialValue="SuperSecret123!"
      />

      <StyledTextDescription
        $fontSize={TextSize.description}
        $fontWeight="700"
        $color={colors.text.primary}
      >
        3. Error State (С сообщением об ошибке)
      </StyledTextDescription>
      <StatefulPasswordCard
        placeholder="Повторите пароль"
        initialValue="12345"
        isError={true}
        isErrorText="Пароль слишком короткий (минимум 8 символов)"
      />

      <StyledTextDescription
        $fontSize={TextSize.description}
        $fontWeight="700"
        $color={colors.text.primary}
      >
        4. Disabled State (Поле заблокировано)
      </StyledTextDescription>
      <StatefulPasswordCard
        placeholder="Старый пароль"
        initialValue="••••••••"
        editable={false}
      />
    </View>
  ),
};

const styles = StyleSheet.create({
  card: {
    borderColor: colors.input.border,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: 6,
    marginBottom: 8,
    width: '100%',
  },
  container: {
    backgroundColor: colors.input.disabled,
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    padding: 24,
    // alignItems: 'center',
  },
});
