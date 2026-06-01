import { Pressable, TextInput } from 'react-native';

import colors from '@/styles/colors';
import { FONT_FAMILY } from '@/styles/typography';

import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import styled from 'styled-components/native';

interface IStyledInputProps {
  $isFocused: boolean;
  $isError: boolean;
  $isDisabled: boolean;
}

const BORDER_RADIUS = 10;
const BORDER_WIDTH_ENABLED = 1;
const BORDER_WIDTH_DISABLED = 3;
const INPUT_MIN_HEIGHT = 50;
const INPUT_HORIZONTAL_PADDING = 14;
const COUNTRY_PADDING_RIGHT = 8;
const COUNTRY_MARGIN_RIGHT = 8;
const COUNTRY_ICON_MARGIN_RIGHT = 6;
const COUNTRY_CODE_MARGIN_RIGHT = 4;
const FLAG_FONT_SIZE = 20;
const ARROW_FONT_SIZE = 12;
const BASE_FONT_SIZE = 16;
const BASE_PADDING_VERTICAL = 10;
const BASE_PADDING_LEFT = 2;
const BASE_PADDING_RIGHT = 8;
const CLEAR_BUTTON_PADDING = 10;
const CLEAR_BUTTON_MARGIN_RIGHT = 8;
const CLEAR_BUTTON_RADIUS = 20;
const CLEAR_ICON_SIZE = 18;
const CLEAR_ICON_RADIUS = 9;
const CLEAR_ICON_FONT_SIZE = 10;
const CLEAR_ICON_LINE_HEIGHT = 12;

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
  border-width: ${(props) =>
    props.$isDisabled
      ? BORDER_WIDTH_DISABLED
      : BORDER_WIDTH_ENABLED}px;
  border-radius: ${BORDER_RADIUS}px;
  overflow: hidden;
  min-height: ${INPUT_MIN_HEIGHT}px;
  border-color: ${(props) => getBorderColor(props)};
  background-color: ${(props) =>
    props.$isDisabled
      ? colors.input.disabled
      : colors.input.background};
  opacity: ${(props) => (props.$isDisabled ? 0.6 : 1)};
`;

export const CountrySelectButton = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  padding-right: ${COUNTRY_PADDING_RIGHT}px;
  margin-right: ${COUNTRY_MARGIN_RIGHT}px;
  border-right-width: 1px;
  border-right-color: ${colors.input.border};
  background-color: ${(props) =>
    props.disabled
      ? colors.input.background
      : colors.input.disabled};
  height: 100%;
  padding-horizontal: ${INPUT_HORIZONTAL_PADDING}px;
`;

export const FlagText = styled.Text`
  font-size: ${FLAG_FONT_SIZE}px;
  margin-right: ${COUNTRY_ICON_MARGIN_RIGHT}px;
`;

export const CountryCodeText = styled.Text`
  font-family: ${FONT_FAMILY.geologicaRegular};
  font-size: ${BASE_FONT_SIZE}px;
  font-weight: 500;
  margin-right: ${COUNTRY_CODE_MARGIN_RIGHT}px;
  color: ${colors.text.primary};
`;

export const ArrowIcon = styled.Text`
  font-size: ${ARROW_FONT_SIZE}px;
  color: ${colors.text.primary};
`;

export const BaseTextInput = styled(TextInput)<
  {
    $isError: boolean;
    onFocus: (
      event: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => void;
    onBlur: (
      event: NativeSyntheticEvent<TextInputFocusEventData>,
    ) => void;
  } & TextInputProps &
    Pick<IStyledInputProps, '$isError'>
>`
  flex: 1;
  font-family: ${FONT_FAMILY.geologicaRegular};
  font-size: ${BASE_FONT_SIZE}px;
  font-weight: 500;
  height: 100%;
  padding-vertical: ${BASE_PADDING_VERTICAL}px;
  padding-left: ${BASE_PADDING_LEFT}px;
  padding-right: ${BASE_PADDING_RIGHT}px;
  color: ${(props) =>
    props.$isError
      ? colors.input.error
      : colors.text.primary};
`;

export const ClearButton = styled(Pressable)`
  justify-content: center;
  align-items: center;
  padding: ${CLEAR_BUTTON_PADDING}px;
  margin-right: ${CLEAR_BUTTON_MARGIN_RIGHT}px;
  border-radius: ${CLEAR_BUTTON_RADIUS}px;
`;

export const ClearIconCircle = styled.View`
  width: ${CLEAR_ICON_SIZE}px;
  height: ${CLEAR_ICON_SIZE}px;
  border-radius: ${CLEAR_ICON_RADIUS}px;
  background-color: ${colors.input.background};
  justify-content: center;
  align-items: center;
`;

export const ClearText = styled.Text`
  font-size: ${CLEAR_ICON_FONT_SIZE}px;
  font-weight: 900;
  color: ${colors.text.primary};
  line-height: ${CLEAR_ICON_LINE_HEIGHT}px;
`;

export type TPhoneInputRef = {
  focus: () => void;
  clear: () => void;
  blur: () => void;
};
