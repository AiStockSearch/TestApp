import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';
import { FONT_FAMILY } from '@/styles/typography';

import type {
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import styled from 'styled-components/native';
export type TButtonVariant = 'primary' | 'outline' | 'link';
interface IButtonWrapperProps {
  $variant: TButtonVariant;
  $isDisabled: boolean;
}

const BUTTON_HEIGHT = 50;
const BUTTON_RADIUS = 16;
const BUTTON_BORDER_WIDTH = 1;
const BUTTON_PADDING_HORIZONTAL = 16;
const BUTTON_PRESSED_OPACITY = 0.75;
const BUTTON_FONT_SIZE = TextSize.description;

const changeStyles = {
  primary: {
    backgroundColor: {
      default: colors.text.link,
      disabled: '#BBEAF4',
    },
    borderColor: {
      default: colors.text.link,
      disabled: '#BBEAF4',
    },
    color: {
      default: colors.input.background,
      disabled: colors.input.background,
    },
  },
  outline: {
    backgroundColor: {
      default: 'transparent',
      disabled: 'transparent',
    },
    borderColor: {
      default: colors.input.border,
      disabled: colors.input.border,
    },
    color: {
      default: colors.text.primary,
      disabled: colors.input.border,
    },
  },
  link: {
    backgroundColor: {
      default: 'transparent',
      disabled: 'transparent',
    },
    borderColor: {
      default: 'transparent',
      disabled: 'transparent',
    },
    color: {
      default: colors.text.link,
      disabled: '#BBEAF4',
    },
  },
} as const;

type IAppButtonProps = {
  title: string;
  variant?: TButtonVariant;
  isDisabled?: boolean;
  onPress: PressableProps['onPress'];
  style?: StyleProp<ViewStyle>;
};

export const StyledPressable = styled(
  Pressable,
)<IButtonWrapperProps>`
  width: 100%;
  min-height: 50px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  padding-horizontal: 16px;
  border-width: 1px;
  border-style: solid;

  background-color: ${(props) =>
    changeStyles[props.$variant].backgroundColor[
      props.$isDisabled ? 'disabled' : 'default'
    ]};
  border-color: ${(props) =>
    changeStyles[props.$variant].borderColor[
      props.$isDisabled ? 'disabled' : 'default'
    ]};
`;

const getPressableStyle =
  (
    outerStyle: StyleProp<ViewStyle>,
    isDisabled: boolean,
  ): ((
    state: PressableStateCallbackType,
  ) => StyleProp<ViewStyle>) =>
  ({ pressed }) => [
    styles.pressable,
    {
      opacity:
        pressed && !isDisabled ? BUTTON_PRESSED_OPACITY : 1,
    },
    outerStyle,
  ];

const getTextStyle = (
  variant: TButtonVariant,
  isDisabled: boolean,
): TextStyle => ({
  color:
    changeStyles[variant].color[
      isDisabled ? 'disabled' : 'default'
    ],
  fontFamily: FONT_FAMILY.geologicaRegular,
  fontSize: BUTTON_FONT_SIZE,
  fontWeight: 'bold',
  textAlign: 'center',
});

export const IButtonBlock = ({
  title,
  variant = 'link',
  isDisabled = false,
  onPress,
  style,
}: IAppButtonProps): React.JSX.Element => {
  const pressableStyle = getPressableStyle(
    style,
    isDisabled,
  );

  return (
    <StyledPressable
      $variant={variant}
      $isDisabled={isDisabled}
      disabled={isDisabled}
      onPress={onPress}
      // Реализация состояния PRESS: меняем opacity на лету через аргумент функции стилей
      style={({ pressed }) => [
        { opacity: pressed && !isDisabled ? 0.75 : 1.0 },
        style,
        pressableStyle({ pressed }),
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      <Text
        style={[
          styles.buttonText,
          getTextStyle(variant, isDisabled),
        ]}
      >
        {title}
      </Text>
    </StyledPressable>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontFamily: FONT_FAMILY.geologicaRegular,
    fontSize: BUTTON_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pressable: {
    alignItems: 'center',
    borderRadius: BUTTON_RADIUS,
    borderStyle: 'solid',
    borderWidth: BUTTON_BORDER_WIDTH,
    justifyContent: 'center',
    minHeight: BUTTON_HEIGHT,
    paddingHorizontal: BUTTON_PADDING_HORIZONTAL,
    width: '100%',
  },
});
