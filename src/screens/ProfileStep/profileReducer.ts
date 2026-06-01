import type { MaskedInputFsmState } from '@/fsm/maskedInputFsm';
import { MASKED_INPUT_PHASE_TYPES } from '@/fsm/maskedInputFsm';
import type { PhoneFsmState } from '@/fsm/phoneInputFsm';
import FSMChangeTextManager from '@/utils/FSMPattern';

import * as KEYS from './constants';
import type {
  IMaskedFieldState,
  ProfileFormState,
} from './types';
const initialMaskedState: IMaskedFieldState = {
  masked: '',
  phase: MASKED_INPUT_PHASE_TYPES.EMPTY,
  digits: '',
};

export const INITIAL_REDUCER_STATE: ProfileFormState = {
  [KEYS.FIRST_NAME]: '',
  [KEYS.LAST_NAME]: '',
  [KEYS.SECOND_NAME]: '',
  [KEYS.DOCUMENT]: '',
  [KEYS.IIN]: initialMaskedState,
  [KEYS.BIRTHDAY]: initialMaskedState,
  [KEYS.PHONE]: initialMaskedState,
  [KEYS.ADDRESS_DOCUMENT]: '',
  [KEYS.DATE_DOCUMENT]: initialMaskedState,
  [KEYS.CATEGORY]: '',
  [KEYS.NUMBER_DRIVER]: initialMaskedState,
  [KEYS.DATE_RELEASE]: initialMaskedState,
};

interface ReducerAction {
  type: string;
  payload: string;
}
export const profileReducer = (
  state: ProfileFormState = INITIAL_REDUCER_STATE,
  { type, payload }: ReducerAction,
): ProfileFormState => {
  switch (type) {
    case KEYS.FIRST_NAME:
    case KEYS.LAST_NAME:
    case KEYS.SECOND_NAME:
    case KEYS.CITIZENSHIP:
    case KEYS.ADDRESS_DOCUMENT:
      return { ...state, [type]: payload };

    case KEYS.CATEGORY:
      if (['A', 'B', 'C', 'D', 'E', ''].includes(payload)) {
        return { ...state, [type]: payload };
      }
      return {
        ...state,
        [type]: payload.slice(1, 2).toUpperCase(),
      };
    case KEYS.DOCUMENT: {
      const nextDocumentState: MaskedInputFsmState =
        FSMChangeTextManager.changeDocumentPattern(
          payload,
          state?.[
            KEYS.DOCUMENT
          ] as unknown as MaskedInputFsmState,
        );
      return { ...state, [type]: nextDocumentState };
    }

    case KEYS.NUMBER_DRIVER: {
      const nextDriverState: MaskedInputFsmState =
        FSMChangeTextManager.changeDocumentPattern(
          payload,
          state?.[
            KEYS.NUMBER_DRIVER
          ] as unknown as MaskedInputFsmState,
        );
      return { ...state, [type]: nextDriverState };
    }

    case KEYS.IIN: {
      const nextIINState: PhoneFsmState =
        FSMChangeTextManager.changeIIN(
          payload,
          state?.[KEYS.IIN] as unknown as PhoneFsmState,
        );
      return { ...state, [type]: nextIINState };
    }
    case KEYS.PHONE: {
      const nextPhoneState: PhoneFsmState =
        FSMChangeTextManager.changePhone(
          payload,
          state?.[KEYS.PHONE] as unknown as PhoneFsmState,
        );
      return { ...state, [type]: nextPhoneState };
    }
    case KEYS.BIRTHDAY:
    case KEYS.DATE_RELEASE:
    case KEYS.DATE_DOCUMENT: {
      const nextDateState = FSMChangeTextManager.changeDate(
        payload,
        state?.[
          type as keyof ProfileFormState
        ] as unknown as PhoneFsmState,
      );
      return { ...state, [type]: nextDateState };
    }
    default:
      return state;
  }
};
