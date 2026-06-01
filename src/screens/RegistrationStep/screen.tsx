import React, { useRef } from 'react';
import {
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';

import type {
  IMaskedFieldState,
  IRegistrationPayload,
} from '@screens/ProfileStep/types';

import phoneSvgIcon from '@/assets/register/phone';
import { IButtonBlock } from '@/components/atoms/IButton';
import {
  Description,
  FooterBlock,
  HeaderBlock,
  Title,
} from '@/components/atoms/styled';
import StyledTextDescription from '@/components/atoms/Typography';
import { ContainerBlock } from '@/components/molecules/registerBlock/ContainerBlock';
import { useNavigationActions } from '@/hooks/register/useNavigationAction';
import type { TRoleType } from '@/screens/RoleStep/screen';
import colors from '@/styles/colors';
import { TextSize } from '@/styles/textSize';

import InfoRow from './InfoRow';
import {
  CardContainer,
  InfoRowContainerWrapper,
} from './styled';

import { useTranslation } from 'react-i18next';
import { SvgXml } from 'react-native-svg';

export default function RegistrationStep({
  userInfo,
  role,
  listData,
  actions,
}: {
  userInfo: IRegistrationPayload;
  role: TRoleType;
  listData: Record<string, string>;
  actions: {
    onEdit: () => void;
    onClose: () => void;
    onGoBack: () => void;
    onRegister: () => void;
  };
}) {
  const { t } = useTranslation();
  const refContainerBlock = useRef<any>(null);
  const navigationActions = useNavigationActions({
    onBack: undefined,
    onClose: undefined,
  });

  return (
    <ContainerBlock
      ref={refContainerBlock}
      actions={navigationActions}
      withoutTab
      translation={{
        navBarTitle:
          role === 'carrier'
            ? t('roleStep.carrierRoleTitle')
            : t('roleStep.clientRoleTitle'),
      }}
      progressBarActive={[true, true, true, true]}
    >
      <HeaderBlock>
        <Title>
          {t('profileStep.title', {
            role:
              role === 'carrier'
                ? t('roleStep.carrierRoleTitle')
                : t('roleStep.clientRoleTitle'),
          })}
        </Title>
        <Description>
          {t('profileStep.description', {
            role:
              role === 'carrier'
                ? t('roleStep.carrierRoleTitle')
                : t('roleStep.clientRoleTitle'),
          })}
        </Description>
      </HeaderBlock>
      <CardContainer
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ gap: 12 }}>
          <View
            style={{
              gap: 4,
              flex: 1,
              alignItems: 'flex-start',
            }}
          >
            <StyledTextDescription
              $fontSize={TextSize.title}
              $fontWeight="bold"
              $color={colors.text.primary}
            >
              {userInfo?.secondName}
            </StyledTextDescription>
            <StyledTextDescription
              $fontSize={TextSize.title}
              $fontWeight="300"
              $color={colors.text.primary}
            >
              {userInfo?.firstName}{' '}
              {userInfo?.lastName}{' '}
            </StyledTextDescription>
          </View>
          <View>
            <StyledTextDescription
              $fontSize={TextSize.medium}
              $fontWeight="600"
              $color={colors.text.secondary}
            >
              {t('profileStep.iin')}:{' '}
              {
                (
                  userInfo?.iin as unknown as IMaskedFieldState
                )?.masked
              }
            </StyledTextDescription>
            <StyledTextDescription
              $fontSize={TextSize.medium}
              $fontWeight="600"
              $color={colors.text.primary}
            >
              {t('profileStep.phone')}:{' '}
              {
                (
                  userInfo?.phone as unknown as IMaskedFieldState
                )?.masked
              }
            </StyledTextDescription>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(`tel:${userInfo?.phone}`);
          }}
          style={{
            borderRadius: 12,
          }}
        >
          <SvgXml
            xml={phoneSvgIcon}
            width={42}
            height={42}
          />
        </TouchableOpacity>
      </CardContainer>
      <InfoRowContainerWrapper>
        <InfoRow
          userInfo={userInfo}
          role={role}
          listData={listData}
        />
      </InfoRowContainerWrapper>
      <FooterBlock style={{ gap: 16 }}>
        <IButtonBlock
          title={t('profileStep.buttonEdit')}
          onPress={actions.onEdit}
          variant="primary"
        />
        <IButtonBlock
          title={t('profileStep.buttonClose')}
          onPress={actions.onClose}
          variant="outline"
        />
      </FooterBlock>
    </ContainerBlock>
  );
}
