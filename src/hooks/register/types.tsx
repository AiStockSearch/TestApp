import type { TFieldState } from '@/fsm/FieldFsmManager';
import type { TPasswordValidationResult } from '@/fsm/FieldFsmManager';
import { FIELD_FSM_ACTION_TYPES } from '@/fsm/FieldFsmManager';
import type { MaskedInputFsmState } from '@/fsm/maskedInputFsm';
import { MASKED_INPUT_PHASE_TYPES } from '@/fsm/maskedInputFsm';

export type RegisterState = {
  checked: boolean;
  phone: {
    masked: MaskedInputFsmState['masked'];
    fsmState: TFieldState;
    phase: MaskedInputFsmState['phase'];
    digits: MaskedInputFsmState['digits'];
    serverError: TPasswordValidationResult[1][1];
  };
  password: string;
  isSubmitting: boolean;
};

export type RegisterAction =
  | { type: typeof CHECKBOX_TOGGLE }
  | { type: typeof PHONE_NUMBER_CHANGE; payload: string }
  | { type: typeof PASSWORD_CHANGE; payload: string }
  | { type: typeof SET_PHONE_SERVER_ERROR; payload: string }
  | { type: typeof SET_SUBMITTING; payload: boolean }
  | {
      type: typeof FIELD_FSM_ACTION_TYPES.SUBMITTING;
      payload: boolean;
    }
  | {
      type: typeof FIELD_FSM_ACTION_TYPES.PRISTINE;
      payload: boolean;
    }
  | {
      type: typeof FIELD_FSM_ACTION_TYPES.TYPING;
      payload: boolean;
    }
  | {
      type: typeof FIELD_FSM_ACTION_TYPES.INVALID;
      payload: boolean;
    }
  | {
      type: typeof FIELD_FSM_ACTION_TYPES.VALID;
      payload: boolean;
    }
  | {
      type: typeof FIELD_FSM_ACTION_TYPES.SERVER_INVALID;
      payload: boolean;
    };

export const initialState: RegisterState = {
  checked: false,
  password: '',
  phone: {
    masked: '',
    fsmState: FIELD_FSM_ACTION_TYPES.PRISTINE,
    serverError: null,
    phase: MASKED_INPUT_PHASE_TYPES.EMPTY,
    digits: '',
  },
  isSubmitting: false,
};

const CHECKBOX_TOGGLE = 'CHECKBOX_TOGGLE';
const PHONE_NUMBER_CHANGE = 'PHONE_NUMBER_CHANGE';
const SET_PHONE_SERVER_ERROR = 'SET_PHONE_SERVER_ERROR';
const SET_SUBMITTING = 'SET_SUBMITTING';
const PASSWORD_CHANGE = 'PASSWORD_CHANGE';
export const REDUCER_ACTION_TYPES = {
  CHECKBOX_TOGGLE,
  PHONE_NUMBER_CHANGE,
  SET_PHONE_SERVER_ERROR,
  SET_SUBMITTING,
  PASSWORD_CHANGE,
} as const;
