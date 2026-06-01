import { TextInput } from 'react-native';

import colors from '@/styles/colors';
import { FONT_FAMILY } from '@/styles/typography';

import type { TextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export interface IStyledInputProps {
  $isFocused: boolean;
  $isError: boolean;
  $isDisabled: boolean;
}

const BORDER_RADIUS = 10;
const BORDER_WIDTH = 1;
const INPUT_MIN_HEIGHT = 50;
const INPUT_HORIZONTAL_PADDING = 14;
const INPUT_VERTICAL_PADDING = 10;
const INPUT_PADDING_RIGHT = 8;
const BUTTON_PADDING = 8;
const BUTTON_MARGIN_RIGHT = -4;
const EYE_ICON_SIZE = 22;
const FONT_SIZE = 16;

const getBorderColor = (
  props: IStyledInputProps,
): string => {
  if (props.$isError) {
    return colors.input.error;
  }
  if (props.$isFocused) {
    return colors.text.link;
  }
  return colors.input.border;
};

export const InputWrapper = styled.View<IStyledInputProps>`
  flex-direction: row;
  align-items: center;
  border-width: ${BORDER_WIDTH}px;
  border-radius: ${BORDER_RADIUS}px;
  overflow: hidden;
  min-height: ${INPUT_MIN_HEIGHT}px;
  padding-horizontal: ${INPUT_HORIZONTAL_PADDING}px;
  border-color: ${(props) => getBorderColor(props)};
  background-color: ${(props) =>
    props.$isDisabled
      ? colors.input.disabled
      : colors.input.background};
  opacity: ${(props) => (props.$isDisabled ? 0.6 : 1)};
`;

export const BaseTextInput = styled(TextInput)<
  TextInputProps & Pick<IStyledInputProps, '$isError'>
>`
  flex: 1;
  font-family: ${FONT_FAMILY.geologicaRegular};
  font-size: ${FONT_SIZE}px;
  font-weight: 500;
  height: 100%;
  padding-vertical: ${INPUT_VERTICAL_PADDING}px;
  padding-right: ${INPUT_PADDING_RIGHT}px;
  color: ${(props) =>
    props.$isError
      ? colors.input.error
      : colors.input.text};
`;

export const EyeButton = styled(BorderlessButton)`
  justify-content: center;
  align-items: center;
  padding: ${BUTTON_PADDING}px;
  margin-right: ${BUTTON_MARGIN_RIGHT}px;
`;

export const EyeIconText = styled.Text`
  font-size: ${EYE_ICON_SIZE}px;
  color: ${colors.text.primary};
`;
