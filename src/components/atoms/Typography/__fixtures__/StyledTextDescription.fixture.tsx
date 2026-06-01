import React from 'react';
import { View } from 'react-native';

import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import StyledTextDescription from '../index'; // Корректируй путь, если нужно

import styled from 'styled-components/native';

// Контейнер-обертка для фикстуры, чтобы текст не прилипал к краям экрана в Cosmos
const ShowcaseContainer = styled.ScrollView`
  flex: 1;
  background-color: #f8fafc;
  padding: 24px;
`;

const Section = styled.View`
  margin-bottom: 32px;
  background-color: #ffffff;
  padding: 16px;
  border-radius: 12px;
  border-width: 1px;
  border-color: #e2e8f0;
`;

const SectionTitle = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: #9ea6b4;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Row = styled.View`
  margin-bottom: 12px;
`;

export default {
  // Базовые варианты использования компонента
  'Все варианты начертаний': (
    <ShowcaseContainer>
      <Section>
        <SectionTitle>
          Начертания (Font Weights)
        </SectionTitle>
        <Row>
          <StyledTextDescription $fontWeight="300">
            Regular 300: Текст описания по умолчанию.
            Введите номер телефона для получения SMS с
            кодом.
          </StyledTextDescription>
        </Row>
        <Row>
          <StyledTextDescription $fontWeight="400">
            Regular 400: Текст описания с весом 400.
          </StyledTextDescription>
        </Row>
        <Row>
          <StyledTextDescription $fontWeight="500">
            Medium 500: Акцентированный текст или важная
            подпись.
          </StyledTextDescription>
        </Row>
        <Row>
          <StyledTextDescription $fontWeight="700">
            Bold 700: Жирный текст (если поддерживается
            шрифтом Geologica).
          </StyledTextDescription>
        </Row>
      </Section>

      <Section>
        <SectionTitle>Размеры (Font Sizes)</SectionTitle>
        <Row>
          <StyledTextDescription
            $fontSize={TextSize.description}
          >
            Размер по умолчанию (TextSize.description)
          </StyledTextDescription>
        </Row>
        <Row>
          <StyledTextDescription $fontSize={12}>
            Кастомный размер: 12px (Метка инпута)
          </StyledTextDescription>
        </Row>
        <Row>
          <StyledTextDescription $fontSize={16}>
            Кастомный размер: 16px (Основной текст)
          </StyledTextDescription>
        </Row>
        <Row>
          <StyledTextDescription $fontSize={20}>
            Кастомный размер: 20px (Подзаголовки)
          </StyledTextDescription>
        </Row>
      </Section>

      <Section>
        <SectionTitle>Цвета (Colors)</SectionTitle>
        <Row>
          <StyledTextDescription>
            Цвет по умолчанию (colors.text.secondary)
          </StyledTextDescription>
        </Row>
        <Row>
          <StyledTextDescription $color={colors.text.link}>
            Цвет ссылки (colors.text.link)
          </StyledTextDescription>
        </Row>
        <Row>
          <StyledTextDescription $color="#00B6ED">
            Кастомный голубой акцент (#00B6ED)
          </StyledTextDescription>
        </Row>
        <Row>
          <StyledTextDescription $color="#181C26">
            Темный текст (#181C26)
          </StyledTextDescription>
        </Row>
      </Section>
    </ShowcaseContainer>
  ),

  // Отдельное состояние для изолированного тестирования длинного текста
  'Длинный текст (Многострочный)': (
    <View
      style={{
        flex: 1,
        padding: 24,
        justifyContent: 'center',
      }}
    >
      <StyledTextDescription>
        Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. На примере этого блока мы тестируем, как
        работает автоматический расчет свойства line-height,
        заложенный в styled-components компонента: он
        умножает текущий размер шрифта на коэффициент 1.2,
        предотвращая склеивание строк.
      </StyledTextDescription>
    </View>
  ),
};
