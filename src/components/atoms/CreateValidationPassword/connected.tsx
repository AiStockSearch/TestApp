import React from 'react';

import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import {
  Container,
  IconContainer,
  TextContainer,
} from './styled';

import { SvgXml } from 'react-native-svg';

const svgXml = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="16" height="16" rx="8" fill="#C9CACC"/>
<path d="M11.2 5.60001L6.42704 10.4L4.80005 8.76382" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const CreateValidationPassword = ({
  title,
  description,
  valid,
}: {
  title: string;
  description?: string;
  valid: boolean;
}) => {
  return (
    <Container>
      <IconContainer>
        <SvgXml
          xml={svgXml.replace(
            'fill="#C9CACC"',
            `fill="${valid ? colors.text.success : colors.input.border}"`,
          )}
        />
      </IconContainer>
      <TextContainer>
        <StyledTextDescription
          $fontSize={TextSize.description}
          $fontWeight="300"
          $letterSpacing={-0.2}
          $color={colors.text.primary}
        >
          {title}
        </StyledTextDescription>
        {description && (
          <StyledTextDescription
            $fontSize={TextSize.description}
            $fontWeight="400"
            $letterSpacing={-0.2}
            $color={colors.text.secondary}
          >
            {description}
          </StyledTextDescription>
        )}
      </TextContainer>
    </Container>
  );
};

export default CreateValidationPassword;
