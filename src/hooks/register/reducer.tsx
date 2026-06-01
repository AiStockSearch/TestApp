import { phoneFsmReducer } from '@fsm/phoneInputFsm';

import { FieldPhoneFsmManager } from '@/fsm/FieldFsmManager';
import { FIELD_FSM_ACTION_TYPES } from '@/fsm/FieldFsmManager';
import { MASKED_INPUT_PHASE_TYPES } from '@/fsm/maskedInputFsm';
import { MASKED_INPUT_FSM_ACTION_TYPES } from '@/fsm/maskedInputFsm';

import type { RegisterState } from './types';
import type { RegisterAction } from './types';
import {
  initialState,
  REDUCER_ACTION_TYPES,
} from './types';

export const reducer = (
  state: RegisterState = initialState,
  action: RegisterAction,
): RegisterState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.CHECKBOX_TOGGLE:
      return { ...state, checked: !state.checked };
    case REDUCER_ACTION_TYPES.PHONE_NUMBER_CHANGE: {
      const nextPhoneState = phoneFsmReducer(
        {
          masked: state.phone?.masked || '',
          phase:
            state.phone?.phase ||
            MASKED_INPUT_PHASE_TYPES.EMPTY,
          digits: state.phone?.digits || '',
        },
        {
          type: MASKED_INPUT_FSM_ACTION_TYPES.SYNC_TEXT,
          text: action.payload,
        },
      );
      const nextText = nextPhoneState.masked;
      const nextFsmState =
        FieldPhoneFsmManager.getNextState(
          nextText,
          state.isSubmitting,
          false,
        );

      return {
        ...state,
        phone: {
          ...state.phone,
          masked: nextText,
          fsmState: nextFsmState,
          phase: nextPhoneState.phase,
          digits: nextPhoneState.digits,
          serverError: null,
        },
      };
    }
    case REDUCER_ACTION_TYPES.SET_PHONE_SERVER_ERROR: {
      const errorMsg = action.payload;
      return {
        ...state,
        isSubmitting: false,
        phone: {
          ...state.phone,
          serverError: errorMsg,
          fsmState: FIELD_FSM_ACTION_TYPES.SERVER_INVALID, // Принудительный переход на шаг серверной ошибки
        },
      };
    }
    case REDUCER_ACTION_TYPES.SET_SUBMITTING: {
      const isSubmitting = action.payload;
      return {
        ...state,
        isSubmitting,
        phone: {
          ...state.phone,
          fsmState: isSubmitting
            ? FIELD_FSM_ACTION_TYPES.SUBMITTING
            : FieldPhoneFsmManager.getNextState(
                state.phone.masked,
                false,
                state.phone.serverError !== null,
              ),
        },
      };
    }
    case REDUCER_ACTION_TYPES.PASSWORD_CHANGE:
      try {
        console.log('password change', action.payload);
        return { ...state, password: action.payload };
      } catch (error) {
        console.error(error);
        return state;
      }
    default:
      return state;
  }
};
