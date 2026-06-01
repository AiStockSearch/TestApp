import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageManger } from '@utils/asyncStorageManager/asyncStorageManager.tsx';

import { STACK_ROUTES } from '@/navigation';
import type { TRoleType } from '@/screens/RoleStep/screen';
import type {
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

export const ROUTEPATH = {
  REGISTRATION: STACK_ROUTES.REGISTRATION,
  CREATE_PROFILE_SCREEN: STACK_ROUTES.CREATE_PROFILE_SCREEN,
  CREATE_PHONE_NUMBER_SCREEN:
    STACK_ROUTES.CREATE_PHONE_NUMBER_SCREEN,
  CREATE_SMS_SCREEN: STACK_ROUTES.CREATE_SMS_SCREEN,
  CREATE_PASSWORD_SCREEN:
    STACK_ROUTES.CREATE_PASSWORD_SCREEN,
  CREATE_PIN_SCREEN: STACK_ROUTES.CREATE_PIN_SCREEN,
  SELECT_ROLE_SCREEN: STACK_ROUTES.SELECT_ROLE_SCREEN,
} as const;

export type TRoutePath =
  (typeof STACK_ROUTES)[keyof typeof STACK_ROUTES];

export interface ISessionInfo {
  sessionId: string;
  timestamp: number;
  currentRoute: TRoutePath;
}

export class RegisterSession {
  constructor(
    private readonly asyncStorageManger: AsyncStorageManger,
  ) {}

  public async startNewSession(): Promise<ISessionInfo> {
    const session: ISessionInfo = {
      sessionId: Math.random()
        .toString(36)
        .substring(2, 15),
      timestamp: Date.now(),
      currentRoute: ROUTEPATH.CREATE_PROFILE_SCREEN,
    };

    await this.asyncStorageManger.setItem(
      ROUTEPATH.REGISTRATION,
      JSON.stringify(session),
    );
    return session;
  }

  public async getCurrentSession(): Promise<ISessionInfo | null> {
    const session = await this.asyncStorageManger.getItem(
      ROUTEPATH.REGISTRATION,
    );
    if (!session) {
      return null;
    }
    try {
      return JSON.parse(session) as ISessionInfo;
    } catch {
      return null;
    }
  }

  public async saveStepData(
    sessionId: string,
    nextRoute: TRoutePath,
    fields: IRegistrationPayload,
  ): Promise<void> {
    const storageKey = `@session_${sessionId}_data`;
    const existingDataRaw =
      await this.asyncStorageManger.getItem(storageKey);
    const existingData = existingDataRaw
      ? (JSON.parse(existingDataRaw) as Record<
          string,
          unknown
        >)
      : {};

    const updatedData = { ...existingData, ...fields };
    await this.asyncStorageManger.setItem(
      storageKey,
      JSON.stringify(updatedData),
    );

    const currentSession = await this.getCurrentSession();
    if (
      currentSession &&
      currentSession.sessionId === sessionId
    ) {
      currentSession.currentRoute = nextRoute;
      await this.asyncStorageManger.setItem(
        ROUTEPATH.REGISTRATION,
        JSON.stringify(currentSession),
      );
    }
  }

  public async getSessionData(
    sessionId: string,
  ): Promise<IRegistrationPayload> {
    if (!sessionId) {
      return {};
    }
    const storageKey = `@session_${sessionId}_data`;
    const data =
      await this.asyncStorageManger.getItem(storageKey);
    return data
      ? (JSON.parse(data) as IRegistrationPayload)
      : {};
  }

  public async clearSession(
    sessionId?: string,
  ): Promise<void> {
    await this.asyncStorageManger.removeItem(
      ROUTEPATH.REGISTRATION,
    );
    if (sessionId) {
      await this.asyncStorageManger.removeItem(
        `@session_${sessionId}_data`,
      );
    }
  }
}

export const registerSessionManager = new RegisterSession(
  new AsyncStorageManger(AsyncStorage),
);
export interface IRegistrationPayload {
  company?: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  phoneNumber?: string;
  smsCode?: string;
  password?: string;
  pin?: string;
  role?: TRoleType;
}

export const useRegistrationStep = (
  currentRoute: TRoutePath,
) => {
  const navigation =
    useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();

  const params = route.params as
    | { sessionId?: string }
    | undefined;
  const sessionId = params?.sessionId || '';

  const [form, setForm] =
    React.useState<IRegistrationPayload>({
      company: '',
      lastName: '',
      firstName: '',
      email: '',
      phoneNumber: '',
      password: '',
      pin: '',
      role: 'client',
    });

  useFocusEffect(
    React.useCallback(() => {
      if (!sessionId) {
        return;
      }

      const restoreFields = async () => {
        const savedFields =
          await registerSessionManager.getSessionData(
            sessionId,
          );
        setForm((prev) => ({ ...prev, ...savedFields }));
      };
      restoreFields();
    }, [sessionId, currentRoute]),
  );

  const updateLocalField = (
    field: keyof IRegistrationPayload,
    value: string,
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveAndNavigateTo = async (
    nextRoute: TRoutePath,
    fieldsToSave: IRegistrationPayload,
  ) => {
    if (!sessionId) {
      console.warn(
        '[useRegistrationStep] Cannot save step data: sessionId is missing.',
      );
      navigation.navigate(STACK_ROUTES.REGISTRATION);
      return;
    }

    const updatedFields = { ...form, ...fieldsToSave };
    setForm(updatedFields);

    await registerSessionManager.saveStepData(
      sessionId,
      nextRoute,
      fieldsToSave,
    );

    navigation.navigate(nextRoute, { sessionId });
  };

  const handleRegistrationComplete = async () => {
    await registerSessionManager.clearSession(sessionId);
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainAppTabs' }],
    });
  };

  return {
    sessionId,
    form,
    updateLocalField,
    saveAndNavigateTo,
    handleRegistrationComplete,
  };
};

export const useRegistrationRouter = () => {
  const navigation =
    useNavigation<NavigationProp<ParamListBase>>();

  const checkAndNavigateSession = async () => {
    try {
      const activeSession =
        await registerSessionManager.getCurrentSession();

      if (activeSession) {
        navigation.navigate(activeSession.currentRoute, {
          sessionId: activeSession.sessionId,
        });
      } else {
        const newSession =
          await registerSessionManager.startNewSession();
        navigation.navigate(
          STACK_ROUTES.SELECT_ROLE_SCREEN,
          { sessionId: newSession.sessionId },
        );
      }
    } catch (error) {
      navigation.navigate(STACK_ROUTES.SELECT_ROLE_SCREEN);
    }
  };

  return { checkAndNavigateSession };
};
