import {
  MaskedInputFsm,
  type MaskedInputFsmEvent,
  type MaskedInputFsmState,
} from './maskedInputFsm';

export const PHONE_MASK_PATTERN = '(000) 000-00-00';

const defaultPhoneFsm = new MaskedInputFsm(
  PHONE_MASK_PATTERN,
);

export const PHONE_MASK_MAX_DIGITS =
  defaultPhoneFsm.maxDigits;
export const PHONE_MASK_DISPLAY_MAX_LENGTH =
  defaultPhoneFsm.displayMaxLength;

export type PhoneFsmState = MaskedInputFsmState;
export type PhoneFsmEvent = MaskedInputFsmEvent;

export function createPhoneInputFsm(
  mask = PHONE_MASK_PATTERN,
  digitChar?: string,
): MaskedInputFsm {
  return digitChar
    ? new MaskedInputFsm(mask, digitChar)
    : new MaskedInputFsm(mask);
}

export function createPhoneFsmState(
  fsm: MaskedInputFsm = defaultPhoneFsm,
): PhoneFsmState {
  return fsm.createState();
}

export function phoneFsmReducer(
  state: PhoneFsmState,
  event: PhoneFsmEvent,
  fsm: MaskedInputFsm = defaultPhoneFsm,
): PhoneFsmState {
  return fsm.reduce(state, event);
}

export function isPhoneInputComplete(
  state: PhoneFsmState,
  fsm: MaskedInputFsm = defaultPhoneFsm,
): boolean {
  return fsm.isComplete(state);
}

export { MaskedInputFsm };
