import type { MaskedInputFsmState } from '@/fsm/maskedInputFsm';
import { MaskedInputFsm } from '@/fsm/maskedInputFsm';
import { MASKED_INPUT_PHASE_TYPES } from '@/fsm/maskedInputFsm';
import { MASKED_INPUT_FSM_ACTION_TYPES } from '@/fsm/maskedInputFsm';
import type { PhoneFsmState } from '@/fsm/phoneInputFsm';
import { phoneFsmReducer } from '@/fsm/phoneInputFsm';

// Удалили дублирующий interface FSMChangeTextManager

type FSMChangeTextManagerResult = [
  MaskedInputFsmState,
  {
    type: typeof MASKED_INPUT_FSM_ACTION_TYPES.SYNC_TEXT;
    text: string;
  },
];

const phoneMaskPattern = new MaskedInputFsm(
  '+0 (000) 000-00-00',
);
const iinMaskPattern = new MaskedInputFsm(
  '00 0000 00-00-00',
);
const documentMaskPattern = new MaskedInputFsm(
  '0000 000000',
);
const dateMaskPattern = new MaskedInputFsm('00.00.0000');

class FSMChangeTextManager {
  // Меняем входной тип на MaskedInputFsmState, так как утилита работает с общим стейтом масок
  static changeMaskPattern(
    text: string,
    phoneState: MaskedInputFsmState,
  ): FSMChangeTextManagerResult {
    return [
      {
        masked: phoneState?.masked || '',
        phase:
          phoneState?.phase ||
          MASKED_INPUT_PHASE_TYPES.EMPTY,
        digits: phoneState?.digits || '',
      },
      {
        type: MASKED_INPUT_FSM_ACTION_TYPES.SYNC_TEXT,
        text: text,
      },
    ];
  }

  static changeDocumentPattern(
    text: string,
    phoneState: MaskedInputFsmState,
  ): MaskedInputFsmState {
    const [state, action] =
      FSMChangeTextManager.changeMaskPattern(
        text,
        phoneState,
      );
    return phoneFsmReducer(
      state,
      action,
      documentMaskPattern,
    );
  }

  static changePhone(
    text: string,
    phoneState: PhoneFsmState,
  ): PhoneFsmState {
    const [state, action] =
      FSMChangeTextManager.changeMaskPattern(
        text,
        phoneState,
      );
    return phoneFsmReducer(state, action, phoneMaskPattern);
  }

  static changeDate(
    text: string,
    dateState: MaskedInputFsmState,
  ): MaskedInputFsmState {
    const [state, action] =
      FSMChangeTextManager.changeMaskPattern(
        text,
        dateState,
      );
    return phoneFsmReducer(state, action, dateMaskPattern);
  }

  static changeIIN(
    text: string,
    iinState: MaskedInputFsmState,
  ): MaskedInputFsmState {
    const [state, action] =
      FSMChangeTextManager.changeMaskPattern(
        text,
        iinState,
      );
    return phoneFsmReducer(state, action, iinMaskPattern);
  }
}

export default FSMChangeTextManager;
