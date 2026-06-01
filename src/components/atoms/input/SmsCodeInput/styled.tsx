import { Pressable } from 'react-native';
import { TextInput } from 'react-native';

import colors from '@/styles/colors';

import styled from 'styled-components/native';

const CONTAINER_MARGIN_VERTICAL = 24;
const CELLS_GAP = 10;
const CELL_SIZE = 54;
const CELL_BORDER_RADIUS = 18;
const CELL_BORDER_WIDTH_ACTIVE = 1.5;
const CELL_BORDER_WIDTH_INACTIVE = 1;
const CELL_SHADOW_OFFSET_Y = 1;
const CELL_SHADOW_RADIUS = 4;
const CELL_TEXT_SIZE = 22;

export const Container = styled.View`
  position: relative;
  align-items: center;
  justify-content: center;
  margin-vertical: ${CONTAINER_MARGIN_VERTICAL}px;
`;

export const CellsContainer = styled(Pressable)`
  flex-direction: row;
  gap: ${CELLS_GAP}px;
`;

const colorStyle = {
  default: {
    borderColor: colors.input.border,
    backgroundColor: colors.input.background,
    shadowColor: colors.text.primary,
  },
  focused: {
    borderColor: colors.text.link,
    backgroundColor: colors.input.background,
    shadowColor: colors.text.link,
  },
  disabled: {
    borderColor: colors.input.border,
    backgroundColor: colors.input.disabled,
    shadowColor: colors.text.primary,
  },
  error: {
    borderColor: colors.input.error,
    backgroundColor: colors.input.background,
    shadowColor: colors.input.error,
  },
  loading: {
    borderColor: colors.input.border,
    backgroundColor: colors.input.background,
    shadowColor: colors.text.primary,
  },
};

const selectMode = ({
  isFocused,
  isDisabled,
  isLoading,
  isError,
}: {
  isFocused: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isError) {
    return 'error';
  }
  if (isLoading) {
    return 'loading';
  }
  if (isFocused) {
    return 'focused';
  }
  if (isDisabled) {
    return 'disabled';
  }
  return 'default';
};

export const Cell = styled.View<{
  $isFocused: boolean;
  $isDisabled: boolean;
  $isLoading: boolean;
  $isError: boolean;
}>`
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  border-width: ${({ $isFocused }) =>
    $isFocused
      ? CELL_BORDER_WIDTH_ACTIVE
      : CELL_BORDER_WIDTH_INACTIVE}px;
  border-color: ${({
    $isFocused,
    $isDisabled,
    $isLoading,
    $isError,
  }) =>
    colorStyle[
      selectMode({
        isFocused: $isFocused,
        isDisabled: $isDisabled,
        isLoading: $isLoading,
        isError: $isError,
      })
    ].borderColor};
  border-radius: ${CELL_BORDER_RADIUS}px;
  background-color: ${({
    $isFocused,
    $isDisabled,
    $isLoading,
    $isError,
  }) =>
    colorStyle[
      selectMode({
        isFocused: $isFocused,
        isDisabled: $isDisabled,
        isLoading: $isLoading,
        isError: $isError,
      })
    ].backgroundColor};
  align-items: center;
  justify-content: center;
  shadow-color: ${({
    $isFocused,
    $isDisabled,
    $isLoading,
    $isError,
  }) =>
    colorStyle[
      selectMode({
        isFocused: $isFocused,
        isDisabled: $isDisabled,
        isLoading: $isLoading,
        isError: $isError,
      })
    ].shadowColor};
  shadow-offset: 0px ${CELL_SHADOW_OFFSET_Y}px;
  shadow-opacity: 0.05;
  shadow-radius: ${CELL_SHADOW_RADIUS}px;
  elevation: 1;
`;

export const CellText = styled.Text`
  font-size: ${CELL_TEXT_SIZE}px;
  font-weight: bold;
  color: ${colors.text.primary};
`;

export const HiddenInput = styled(TextInput)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
`;
