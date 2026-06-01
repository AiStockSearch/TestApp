import React from 'react';

import PhoneStepScreen from '@screens/PhoneStep';
import CreateProfileScreen from '@screens/ProfileStep';
import RegistrationStepScreen from '@screens/RegistrationStep';
import RoleStepScreen from '@screens/RoleStep/screen';
import CreateSMSScreen from '@screens/SMSStep';

import { LoadingScreen } from '@/components/molecules/loading';
import { useRootNavigator } from '@/hooks/register/useRootNavigator';
import type { IRegistrationPayload } from '@/screens/ProfileStep/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { STACK_ROUTES } from './routes';
import type { RootStackParamList } from './types';
const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { loading, initialRouteName, profile } =
    useRootNavigator();
  const refStackNavigator = React.useRef<any>(null);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      ref={refStackNavigator}
      screenOptions={{ headerShown: false }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen
        name={STACK_ROUTES.CREATE_PHONE_NUMBER_SCREEN}
        component={PhoneStepScreen}
      />
      <Stack.Screen
        name={
          STACK_ROUTES.SELECT_ROLE_SCREEN as keyof RootStackParamList
        }
        component={RoleStepScreen}
      />
      <Stack.Screen
        name={STACK_ROUTES.CREATE_SMS_SCREEN}
        component={CreateSMSScreen}
      />

      <Stack.Screen
        name={STACK_ROUTES.CREATE_PROFILE_SCREEN}
        component={CreateProfileScreen}
      />
      <Stack.Screen
        name={STACK_ROUTES.REGISTRATION}
        component={RegistrationStepScreen}
        initialParams={
          profile
            ? {
                profile:
                  profile as unknown as IRegistrationPayload,
              }
            : {}
        }
      />
    </Stack.Navigator>
  );
}
