import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { IBox } from '@/components/atoms/IBox';
import { IButtonBlock } from '@/components/atoms/IButton';
import StyledTextDescription from '@/components/atoms/Typography';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

const ButtonBlock = (deps: {
  dontHaveAccountText: string;
  haveAccountText: string;
  handlePhoneNumberPress: () => void;
  rememberMeButton: string;
  phoneNumber: string;
  handleForgotPasswordPress: () => void;
}) => {
  const [state, setState] = React.useState(false);

  const handlePhoneNumberPress = () => {
    setState(!state);
  };

  const handlePhoneNumberPressed = () => {
    setState(false);
    deps.handleForgotPasswordPress();
  };

  return (
    <IBox>
      <IButtonBlock
        title={deps.rememberMeButton}
        onPress={deps.handleForgotPasswordPress}
        variant="link"
      />
      <TouchableOpacity onPress={handlePhoneNumberPressed}>
        <IBox
          customStyle={styles.iboxPhoneNumberTextColumn}
        >
          <StyledTextDescription
            $fontSize={TextSize.description}
            $fontWeight="500"
            $color={colors.text.secondary}
            style={{ flex: 1 }}
          >
            {deps.dontHaveAccountText}
          </StyledTextDescription>
          <IBox customStyle={styles.iboxPhoneNumberText}>
            <TouchableOpacity
              onPress={handlePhoneNumberPress}
              style={{ flex: 1, maxWidth: '55%' }}
            >
              <StyledTextDescription
                $fontSize={TextSize.description}
                $fontWeight="bold"
                numberOfLines={state ? undefined : 2}
                $color={colors.text.secondary}
                $letterSpacing={-0.2}
                style={{ textAlign: 'right' }}
              >
                {deps.haveAccountText}
              </StyledTextDescription>
            </TouchableOpacity>
            <StyledTextDescription
              $fontSize={TextSize.description}
              $fontWeight="600"
              $color={colors.text.secondary}
              $letterSpacing={0.2}
              style={{ maxWidth: '45%', textAlign: 'left' }}
            >
              {deps.phoneNumber}
            </StyledTextDescription>
          </IBox>
        </IBox>
      </TouchableOpacity>
    </IBox>
  );
};

export default ButtonBlock;

const styles = StyleSheet.create({
  iboxPhoneNumberText: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  iboxPhoneNumberTextColumn: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'center',
    paddingTop: 16,
  },
  phoneNumberText: {
    color: colors.text.secondary,
    fontSize: TextSize.description,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  phoneNumberTextPressed: {
    color: colors.text.link,
  },
});
