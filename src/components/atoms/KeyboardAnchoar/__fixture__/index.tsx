import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import DynamicInputBox from '@/components/atoms/IInput';
import { KeyboardAwareAnchor } from '@/components/atoms/KeyboardAnchoar';
import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

export default {
  'Inside ScrollView Form': () => {
    const scrollViewRef = useRef<ScrollView>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [company, setCompany] = useState('');

    // Реализуем функцию прокрутки, которую требует пропс scrollTo
    const handleScrollTo = (props: {
      y: number;
      animated: boolean;
    }) => {
      scrollViewRef.current?.scrollTo({
        y: props.y,
        animated: props.animated,
      });
    };

    return (
      <View style={styles.screen}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={[
              styles.placeholderBlock,
              { backgroundColor: colors.text.primary },
            ]}
          >
            <StyledTextDescription
              $fontSize={TextSize.description}
              $fontWeight="bold"
              $color={colors.text.primary}
            >
              Баннер / Контент экрана
            </StyledTextDescription>
          </View>

          <StyledTextDescription
            $fontSize={TextSize.title}
            $fontWeight="bold"
            $color={colors.text.primary}
          >
            Заполните форму
          </StyledTextDescription>

          <DynamicInputBox
            placeholder="Ваше имя"
            placeholderTextColor={colors.input.placeholder}
            value={name}
            onChangeText={setName}
          />

          <DynamicInputBox
            placeholder="Телефон"
            placeholderTextColor={colors.input.placeholder}
            value={phone}
            onChangeText={setPhone}
          />

          {new Array(10).fill(0).map((_, index) => (
            <KeyboardAwareAnchor
              key={index}
              scrollTo={handleScrollTo}
              extraOffset={40}
            >
              {(coordY) => (
                <DynamicInputBox
                  onFocus={() =>
                    handleScrollTo({
                      y: coordY - 100,
                      animated: true,
                    })
                  }
                  placeholder="Название компании (Скролл сюда)"
                  placeholderTextColor={
                    colors.input.placeholder
                  }
                  value={company}
                  onChangeText={setCompany}
                />
              )}
            </KeyboardAwareAnchor>
          ))}
          <View
            style={[
              styles.placeholderBlock,
              {
                backgroundColor: colors.text.link,
                marginTop: 40,
              },
            ]}
          >
            <StyledTextDescription
              $fontSize={TextSize.description}
              $fontWeight="bold"
              $color={colors.text.primary}
            >
              Подвал формы / Кнопки отправки
            </StyledTextDescription>
          </View>
        </ScrollView>
      </View>
    );
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.input.background,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 300, // Даем большой запас снизу, чтобы была возможность скроллить
  },
  placeholderBlock: {
    height: 200,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  blockText: {
    color: '#AEAEB2',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputSpacing: {
    marginBottom: 16,
  },
  anchorContainer: {
    backgroundColor: 'rgba(58, 58, 60, 0.4)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#48484A',
  },
  debugText: {
    color: '#8E8E93',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});
