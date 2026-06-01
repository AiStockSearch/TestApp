import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';
import { FONT_FAMILY } from '@/styles/typography';
const INPUT_MIN_HEIGHT = 56;
const INPUT_BORDER_WIDTH = 1;
const INPUT_BORDER_RADIUS = 10;
const INPUT_HORIZONTAL_PADDING = 12;
const INPUT_VERTICAL_PADDING = 2;
const CLEAR_BUTTON_SIZE = 4;
const CLEAR_ICON_FONT_SIZE = 18;
const LABEL_TOP_EMPTY = 16;
const LABEL_TOP_FILLED = 6;
const LABEL_FONT_SIZE_EMPTY = 16;
const LABEL_FONT_SIZE_FILLED = 11;
const LABEL_ANIMATION_DURATION = 180;
const LABEL_MIN_VALUE = 0;
const LABEL_MAX_VALUE = 1;
const LABEL_EMPTY_HIDE = 0;
const LABEL_FILLED_SHOW = 1;
const LABEL_DEFAULT_COLOR = 0;
const LABEL_FILLED_COLOR = 1;
const LABEL_FILLED_TEXT_WEIGHT = '500';

type DynamicInputProps = {
  onFocus?: () => void;
  placeholder: string;
  placeholderTextColor: string;
  name?: string;
  value: string;
  onChangeText: (text: string) => void;
  isDisabled?: boolean;
  onBlur?: () => void;
  secureTextEntry?: boolean;
  keyboardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  label?: string;
  isError?: boolean;
  errorMessage?: string;
};

const DynamicInputBox = React.forwardRef<
  TextInput,
  DynamicInputProps
>(
  (
    {
      label,
      name,
      isError,
      errorMessage,
      placeholder,
      placeholderTextColor,
      value,
      onChangeText,
      onBlur,
      isDisabled = false,
      secureTextEntry = false,
      keyboardType = 'default',
      onFocus,
    },
    ref,
  ): React.JSX.Element => {
    const [isFocused, setIsFocused] = useState(false);
    const animatedLabelValue = useRef(
      new Animated.Value(
        value.length > 0
          ? LABEL_FILLED_SHOW
          : LABEL_EMPTY_HIDE,
      ),
    ).current;

    useEffect(() => {
      Animated.timing(animatedLabelValue, {
        toValue:
          isFocused || value.length > 0
            ? LABEL_FILLED_SHOW
            : LABEL_EMPTY_HIDE,
        duration: LABEL_ANIMATION_DURATION,
        useNativeDriver: false,
      }).start();
    }, [animatedLabelValue, isFocused, value.length]);

    const handleFocus = (): void => {
      setIsFocused(true);
      onFocus?.();
    };

    const handleBlur = (): void => {
      setIsFocused(false);
      onBlur?.();
    };

    const handleClearPress = (): void => {
      onChangeText('');
    };

    const labelTop = animatedLabelValue.interpolate({
      inputRange: [LABEL_MIN_VALUE, LABEL_MAX_VALUE],
      outputRange: [LABEL_TOP_EMPTY, LABEL_TOP_FILLED],
    });

    const labelFontSize = animatedLabelValue.interpolate({
      inputRange: [LABEL_MIN_VALUE, LABEL_MAX_VALUE],
      outputRange: [
        LABEL_FONT_SIZE_EMPTY,
        LABEL_FONT_SIZE_FILLED,
      ],
    });

    const labelColor = animatedLabelValue.interpolate({
      inputRange: [LABEL_DEFAULT_COLOR, LABEL_FILLED_COLOR],
      outputRange: [
        colors.input.placeholder,
        colors.text.secondary,
      ],
    });

    const floatingLabel = label ?? placeholder;

    return (
      <>
        <View
          style={[
            styles.container,
            isError ? styles.errorContainer : null,
          ]}
        >
          <Animated.Text
            pointerEvents="none"
            style={[
              styles.floatingLabel,
              {
                color: labelColor,
                fontSize: labelFontSize,
                top: labelTop,
              },
              value.length === 0
                ? styles.hiddenLabel
                : null,
            ]}
          >
            {floatingLabel}
          </Animated.Text>

          <TextInput
            ref={ref}
            editable={!isDisabled}
            id={name}
            keyboardType={keyboardType}
            onBlur={handleBlur}
            onChangeText={onChangeText}
            onFocus={handleFocus}
            placeholder={
              value.length !== 0 ? '' : placeholder
            }
            placeholderTextColor={placeholderTextColor}
            secureTextEntry={secureTextEntry}
            selectionColor={colors.text.link}
            style={[
              styles.textInput,
              {
                color:
                  value.length === 0
                    ? colors.input.placeholder
                    : colors.input.text,
                paddingTop: value.length === 0 ? 0 : 16,
                fontSize:
                  value.length === 0
                    ? TextSize.description
                    : TextSize.medium,
              },
            ]}
            value={value}
          />

          {value.length > 1 && !isDisabled && (
            <Pressable
              hitSlop={CLEAR_BUTTON_SIZE}
              onPress={handleClearPress}
              style={styles.clearButton}
            >
              <Text style={styles.clearIcon}>×</Text>
            </Pressable>
          )}
        </View>
        {isError && (
          <StyledTextDescription
            $color={colors.input.error}
            $fontSize={TextSize.small}
            $fontWeight="300"
            $letterSpacing={0.2}
            style={styles.errorText}
          >
            {errorMessage}
          </StyledTextDescription>
        )}
      </>
    );
  },
);

const styles = StyleSheet.create({
  errorText: {
    marginTop: 4,
    textAlign: 'right',
  },
  errorContainer: {
    borderColor: colors.input.error,
  },
  clearButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    padding: CLEAR_BUTTON_SIZE,
  },
  clearIcon: {
    color: colors.input.placeholder,
    fontSize: CLEAR_ICON_FONT_SIZE,
    fontWeight: 'bold',
  },
  floatingLabel: {
    fontFamily: FONT_FAMILY.geologicaRegular,
    fontWeight: LABEL_FILLED_TEXT_WEIGHT,
    left: INPUT_HORIZONTAL_PADDING,
    position: 'absolute',
  },
  hiddenLabel: {
    display: 'none',
  },
  container: {
    alignItems: 'center',
    borderColor: colors.input.border,
    borderRadius: INPUT_BORDER_RADIUS,
    borderWidth: INPUT_BORDER_WIDTH,
    flexDirection: 'row',
    minHeight: INPUT_MIN_HEIGHT,
    paddingHorizontal: INPUT_HORIZONTAL_PADDING,
    paddingVertical: INPUT_VERTICAL_PADDING,
    width: '100%',
  },
  textInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.geologicaRegular,
    fontSize: TextSize.medium,
    fontWeight: LABEL_FILLED_TEXT_WEIGHT,
    minHeight: 50,
    paddingBottom: 4,
  },
});

export default DynamicInputBox;
