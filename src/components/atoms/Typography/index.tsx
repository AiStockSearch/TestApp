import { Text } from 'react-native';

import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';
import { FONT_FAMILY } from '@/styles/typography';

import type { TextStyle } from 'react-native';
import styled from 'styled-components/native';

type StyledTextDescriptionProps = {
  $fontSize?: TextStyle['fontSize'];
  $fontWeight?: TextStyle['fontWeight'];
  $letterSpacing?: TextStyle['letterSpacing'];
  $color?: string;
};

const StyledTextDescription = styled(
  Text,
)<StyledTextDescriptionProps>`
  font-family: ${FONT_FAMILY.geologicaRegular};
  font-size: ${({ $fontSize }) =>
    $fontSize ?? TextSize.description}px;
  font-weight: ${({ $fontWeight }) => $fontWeight ?? '300'};
  color: ${({ $color }) => $color ?? colors.text.secondary};
  letter-spacing: ${({ $letterSpacing }) =>
    $letterSpacing ?? 0.4}px;
  line-height: ${({ $fontSize }) =>
    ($fontSize ?? TextSize.description) * 1.2}px;
`;

export default StyledTextDescription;
