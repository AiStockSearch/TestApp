import type { TRoleType } from '@/screens/RoleStep/screen';
export interface IRegistrationPayload {
  role: TRoleType;
  firstName: string;
  lastName: string;
  secondName: string;
  iin: string;
  birthDate: string;
  phone: string;
  document: string;
  addressDocument: string;
  dateDocument: string;
  category: string;
  numberDriver: string;
  dateRelease: string;
  [key: string]: string | IMaskedFieldState;
}

export interface ProfileStepProps {
  data: IRegistrationPayload;
  translation: {
    title: string;
    description: string;
    navBarTitle: string;
    buttonText: string;
  };
  actions: {
    onEdit: () => void;
    onClose: () => void;
    onGoBack: () => void;
    onRegister: () => void;
  };
}

export interface IMaskedFieldState {
  masked: string;
  phase: string;
  digits: string;
}

export type ProfileFormState = {
  [key in keyof IRegistrationPayload]?:
    | string
    | IMaskedFieldState;
};
