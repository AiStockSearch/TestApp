import { StyleSheet } from 'react-native';

import { company } from '@/assets';
import { IBox } from '@/components/atoms/IBox';
import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import { SvgXml } from 'react-native-svg';

const HeaderBlock = (deps: {
  title: string;
  companyName: string;
  description: string;
}) => {
  return (
    <>
      <IBox customStyle={headerBlockStyles.headerBlock}>
        <SvgXml xml={company} width={72} height={72} />
      </IBox>
      <IBox customStyle={headerBlockStyles.headerBlock}>
        <StyledTextDescription
          $fontSize={TextSize.title}
          $fontWeight="bold"
          $color={colors.text.primary}
        >
          {deps.title}
        </StyledTextDescription>
        <StyledTextDescription
          $fontSize={TextSize.title}
          $fontWeight="bold"
          $color={colors.text.primary}
        >
          {deps.companyName}
        </StyledTextDescription>
      </IBox>
      <IBox customStyle={headerBlockStyles.headerBlock}>
        <StyledTextDescription
          $fontSize={TextSize.description}
          $fontWeight="300"
          $color={colors.text.secondary}
          $letterSpacing={0.96}
        >
          {deps.description}
        </StyledTextDescription>
      </IBox>
    </>
  );
};

export default HeaderBlock;

const headerBlockStyles = StyleSheet.create({
  headerBlock: {
    marginTop: 12,
  },
  headerBlockContainer: {
    marginBottom: 24,
    marginTop: 12,
    paddingTop: 8,
  },
});
