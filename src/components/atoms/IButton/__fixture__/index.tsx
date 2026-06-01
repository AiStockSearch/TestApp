import React from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

import { IBox } from '@/components/atoms/IBox';
import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import { IButtonBlock } from '..'; // Скорректируй путь к компоненту, если нужно

import styled from 'styled-components/native';
const handlePress = () =>
  Alert.alert(
    'Button Pressed',
    'Колбэк onPress успешно отработал!',
  );

const Container = styled.View`
  flex: 1;
  padding: 16px;
  justify-content: flex-start;
  gap: 4px;
`;

const Card = styled.View`
  backgroundcolor: ${colors.input.disabled};
  padding: 16px;
  borderradius: 20px;
  gap: 16px;
  width: ${Dimensions.get('window').width - 32}px;
`;

export default {
  'All Variants Matrix': () => (
    <Container>
      <StyledTextDescription
        $fontSize={TextSize.title}
        $fontWeight="bold"
        $color={colors.text.primary}
      >
        Primary Variant
      </StyledTextDescription>
      <IButtonBlock
        title="Primary Button"
        variant="primary"
        onPress={handlePress}
      />
      <IButtonBlock
        title="Primary Disabled"
        variant="primary"
        isDisabled={true}
        onPress={handlePress}
      />

      <View style={styles.divider} />

      <StyledTextDescription
        $fontSize={TextSize.title}
        $fontWeight="bold"
        $color={colors.text.primary}
      >
        Outline Variant
      </StyledTextDescription>
      <IButtonBlock
        title="Outline Button"
        variant="outline"
        onPress={handlePress}
      />
      <IButtonBlock
        title="Outline Disabled"
        variant="outline"
        isDisabled={true}
        onPress={handlePress}
      />

      <View style={styles.divider} />

      <StyledTextDescription
        $fontSize={TextSize.title}
        $fontWeight="bold"
        $color={colors.text.primary}
      >
        Link Variant
      </StyledTextDescription>
      <IButtonBlock
        title="Link Button"
        variant="link"
        onPress={handlePress}
      />
      <IButtonBlock
        title="Link Disabled"
        variant="link"
        isDisabled={true}
        onPress={handlePress}
      />
    </Container>
  ),
  'Inside Container Examples': () => (
    <IBox
      customStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <Card>
        <StyledTextDescription
          $fontSize={TextSize.title}
          $fontWeight="bold"
          $color={colors.text.primary}
        >
          Подтверждение действия
        </StyledTextDescription>
        <StyledTextDescription
          $fontSize={TextSize.description}
          $fontWeight="500"
          $color={colors.text.secondary}
        >
          Вы уверены, что хотите продолжить? Это действие
          нельзя будет отменить.
        </StyledTextDescription>
        <View>
          <IButtonBlock
            title="Да, продолжить"
            variant="primary"
            onPress={handlePress}
            style={{ marginBottom: 8 }}
          />
          <IButtonBlock
            title="Отмена"
            variant="link"
            onPress={handlePress}
          />
        </View>
      </Card>
    </IBox>
  ),
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#2c2c2e',
    borderRadius: 20,
    padding: 20,
    width: '100%',
  },
  cardText: {
    color: '#aeaechange',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  centered: {
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#1c1c1e', // Темная тема для контраста, подстрой под проект
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: '#3a3a3c',
    height: 1,
    marginVertical: 16,
  },
  sectionTitle: {
    color: '#8e8e93',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 16,
    textTransform: 'uppercase',
  },
});
