import React, { useRef, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import { IBox } from '@/components/atoms/IBox';
import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import type { TPhoneInputRef } from '../connected';
import { PhoneInput } from '../connected'; // Скорректируй путь к твоему компоненту

const StatefulPhoneInput = ({
  initialValue = '',
  isError = false,
  isErrorText = null,
  editable = true,
  label,
}: {
  initialValue?: string;
  isError?: boolean;
  isErrorText?: string | null;
  editable?: boolean;
  label: string;
}) => {
  const [value, setValue] = useState(initialValue);
  const phoneInputRef = useRef<TPhoneInputRef>(null);

  return (
    <IBox customStyle={styles.card}>
      <StyledTextDescription
        $fontSize={TextSize.description}
        $fontWeight="400"
        $color={colors.text.primary}
      >
        {label}
      </StyledTextDescription>
      <PhoneInput
        ref={phoneInputRef}
        flag="🇷🇺"
        countryCode="+7"
        value={value}
        placeholder="999 000-00-00"
        onChangeText={setValue}
        isError={isError}
        isErrorText={isErrorText}
        editable={editable}
        onCountryPress={() =>
          console.log('Открытие модалки выбора стран')
        }
      />

      {editable && (
        <View style={styles.refButtonsRow}>
          <Button
            title="Focus"
            onPress={() => phoneInputRef.current?.focus()}
            color="#252526"
          />
          <Button
            title="Clear & Focus"
            onPress={() => phoneInputRef.current?.clear()}
            color="#9AA2B1"
          />
        </View>
      )}
    </IBox>
  );
};

export default {
  'Phone Input Matrix': () => (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <StatefulPhoneInput
        label="1. Enabled / Empty State"
        initialValue=""
      />

      <StatefulPhoneInput
        label="2. Filled State (Должен появиться крестик)"
        initialValue="9112345678"
      />

      <StatefulPhoneInput
        label="3. Error State (Состояние ошибки)"
        initialValue="999"
        isError={true}
        isErrorText="Неверный формат номера телефона"
      />

      <StatefulPhoneInput
        label="4. Disabled State (Только чтение)"
        initialValue="9001234567"
        editable={false}
      />
    </ScrollView>
  ),
};

// Импортируем ScrollView для фикстуры, чтобы всё влезло на экран Cosmos
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  card: {
    borderColor: colors.input.border,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    gap: 6,
    padding: 16,
  },
  container: {
    flex: 1,
    gap: 12,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  label: {
    color: '#1A1C1E',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 12,
  },
  refButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
    marginTop: 12,
  },
});
