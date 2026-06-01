export const STACK_ROUTES = {
  REGISTRATION: 'Registration',
  CREATE_PHONE_NUMBER_SCREEN: 'CreatePhoneNumberScreen',
  CREATE_SMS_SCREEN: 'CreateSMSScreen',
  CREATE_PROFILE_SCREEN: 'CreateProfileScreen',
  HOME: 'Home',
  CREATE_PASSWORD_SCREEN: 'CreatePasswordScreen',
  FORGOT_PASSWORD: 'ForgotPassword',
  CREATE_PIN_SCREEN: 'CreatePinScreen',
  SELECT_ROLE_SCREEN: 'SelectRoleScreen',
} as const;

export type StackRouteName =
  (typeof STACK_ROUTES)[keyof typeof STACK_ROUTES];
