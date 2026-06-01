import React, { useState } from 'react';

import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import CheckBoxWrapper from '../index'; // Корректируй путь к компоненту, если нужно

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: center;
  background-color: ${colors.text.primary};
`;

// Вспомогательный контролируемый компонент для Cosmos
const StatefulCheckbox = ({
  initialValue,
  label,
}: {
  initialValue: boolean;
  label: string;
}) => {
  const [checked, setChecked] = useState(initialValue);

  return (
    <CheckBoxWrapper
      checked={checked}
      onPress={() => setChecked(!checked)}
    >
      <StyledTextDescription
        $color={colors.input.background}
      >
        {label}
      </StyledTextDescription>
    </CheckBoxWrapper>
  );
};

// Экспортируем различные состояния для отображения в панели Cosmos
export default {
  'Default (Unchecked)': () => (
    <Container>
      <StatefulCheckbox
        initialValue={false}
        label="Согласен с условиями использования"
      />
    </Container>
  ),
  'Default (Checked)': () => (
    <Container>
      <StatefulCheckbox
        initialValue={true}
        label="Получать маркетинговые уведомления"
      />
    </Container>
  ),
  'Multiple Group': () => (
    <Container>
      <StyledTextDescription
        $fontSize={TextSize.title}
        $fontWeight="bold"
        $color={colors.input.background}
      >
        Настройки профиля
      </StyledTextDescription>
      <StatefulCheckbox
        initialValue={true}
        label="Включить Push-уведомления"
      />
      <StatefulCheckbox
        initialValue={false}
        label="Двухфакторная аутентификация"
      />
      <StatefulCheckbox
        initialValue={false}
        label="Темная тема"
      />
    </Container>
  ),
};
