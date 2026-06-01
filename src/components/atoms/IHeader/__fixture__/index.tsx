import React from 'react';
import { Alert } from 'react-native';

import colors from '@/styles/colors';

import { CustomHeader } from '../index'; // Скорректируй путь к файлу (на скрине у тебя был IHeaders.tsx)

import styled from 'styled-components/native';
const Container = styled.View`
  backgroundcolor: ${colors.input.background};
  justifycontent: center;
  alignitems: center;
  flex: 1;
`;

const mockActions = {
  onBack: () =>
    Alert.alert('Navigation', 'Клик по кнопке Назад (‹)'),
  onClose: () =>
    Alert.alert('Navigation', 'Клик по кнопке Закрыть (×)'),
};

export default {
  'Standard Header': () => (
    <Container>
      <CustomHeader
        title="Регистрация компании"
        onBack={mockActions.onBack}
        onClose={mockActions.onClose}
      />
    </Container>
  ),
  'Long Title Case': () => (
    <Container>
      <CustomHeader
        title="Политика конфиденциальности и персональных данных пользователя"
        onBack={mockActions.onBack}
        onClose={mockActions.onClose}
      />
    </Container>
  ),
};
