import type { STACK_ROUTES } from './routes';

type TRegisterSessionParams = {
  sessionId?: string;
};

export type RootStackParamList = {
  [STACK_ROUTES.REGISTRATION]: undefined;
  [STACK_ROUTES.CREATE_PHONE_NUMBER_SCREEN]:
    | TRegisterSessionParams
    | undefined;
  [STACK_ROUTES.CREATE_SMS_SCREEN]:
    | TRegisterSessionParams
    | undefined;
  [STACK_ROUTES.CREATE_PROFILE_SCREEN]:
    | TRegisterSessionParams
    | undefined;
  [STACK_ROUTES.CREATE_PASSWORD_SCREEN]:
    | TRegisterSessionParams
    | undefined;
  [STACK_ROUTES.FORGOT_PASSWORD]: undefined;
};
// export type RootStackParamList = Record<
//   StackRouteName,
//   undefined
// >;
