import React, { useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager.tsx';

import { IButtonBlock } from '@/components/atoms/IButton';
import {
  Description,
  FooterBlock,
  HeaderBlock,
  Title,
} from '@/components/atoms/styled';
import { ContainerBlock } from '@/components/molecules/registerBlock/ContainerBlock';
import { useNavigationActions } from '@/hooks/register/useNavigationAction';
import { STACK_ROUTES } from '@/navigation/routes';
import type { RootStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import {
  CardDescription,
  CardsContainer,
  CardText,
  CardTitle,
  CarrierCard,
  ClientCard,
  IconContainer,
} from './styled';

import { useTranslation } from 'react-i18next';

export type TRoleType = 'client' | 'carrier';
export default function RoleStepScreen() {
  const { t } = useTranslation();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList>
    >();
  const navigationActions = useNavigationActions({
    onBack: undefined,
    onClose: undefined,
  });
  const [selected, setSelected] =
    useState<TRoleType>('client');
  const refContainerBlock = React.useRef<{
    scrollTo: (y: number) => void;
  }>(null);
  const asyncStorageManager = new AsyncStorageManger(
    AsyncStorage,
  );

  const translation = {
    buttonText: t('roleStep.buttonText'),
    navBarTitle: t('roleStep.navBarTitle'),
    title: t('roleStep.title'),
    description: t('roleStep.description'),
    clientRoleTitle: t('roleStep.clientRoleTitle'),
    clientRoleDescription: t(
      'roleStep.clientRoleDescription',
    ),
    carrierRoleTitle: t('roleStep.carrierRoleTitle'),
    carrierRoleDescription: t(
      'roleStep.carrierRoleDescription',
    ),
  };
  const actions = {
    onSubmit: (role: string) => {
      asyncStorageManager
        .setItem('role', role)
        .then(() => {
          navigation.navigate(
            STACK_ROUTES.CREATE_SMS_SCREEN,
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
  };

  return (
    <ContainerBlock
      ref={refContainerBlock}
      actions={navigationActions}
      translation={translation}
      progressBarActive={[true, true, false, false]}
    >
      <HeaderBlock>
        <Title>{translation.title}</Title>
        <Description>{translation.description}</Description>
      </HeaderBlock>

      <CardsContainer>
        <ClientCard
          $isSelected={selected === 'client'}
          onPress={() => setSelected('client')}
        >
          <IconContainer
            $isSelected={selected === 'client'}
          />
          <CardText>
            <CardTitle $isSelected={selected === 'client'}>
              {translation.clientRoleTitle}
            </CardTitle>
            <CardDescription
              $isSelected={selected === 'client'}
            >
              {translation.clientRoleDescription}
            </CardDescription>
          </CardText>
        </ClientCard>

        <CarrierCard
          onPress={() => setSelected('carrier')}
          $isSelected={selected === 'carrier'}
        >
          <IconContainer
            $isSelected={selected === 'carrier'}
          />
          <CardText>
            <CardTitle $isSelected={selected === 'carrier'}>
              {translation.carrierRoleTitle}
            </CardTitle>
            <CardDescription
              $isSelected={selected === 'carrier'}
            >
              {translation.carrierRoleDescription}
            </CardDescription>
          </CardText>
        </CarrierCard>
      </CardsContainer>

      <FooterBlock>
        <IButtonBlock
          title={translation.buttonText}
          onPress={() => actions.onSubmit(selected)}
          variant="primary"
        />
      </FooterBlock>
    </ContainerBlock>
  );
}
