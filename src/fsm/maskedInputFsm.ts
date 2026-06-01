export const EMPTY = 'empty';
export const PARTIAL = 'partial';
export const COMPLETE = 'complete';

export const MASKED_INPUT_PHASE_TYPES = {
  EMPTY,
  PARTIAL,
  COMPLETE,
} as const;

export type MaskedInputPhase =
  | typeof EMPTY
  | typeof PARTIAL
  | typeof COMPLETE;

const RESET = 'RESET';
const SYNC_TEXT = 'SYNC_TEXT';
const DIGIT = 'DIGIT';
const BACKSPACE = 'BACKSPACE';

export const MASKED_INPUT_FSM_ACTION_TYPES = {
  RESET,
  SYNC_TEXT,
  DIGIT,
  BACKSPACE,
} as const;

export type MaskedInputFsmState = {
  phase: MaskedInputPhase;
  digits: string;
  masked: string;
};

export type MaskedInputFsmEvent =
  | {
      type: typeof MASKED_INPUT_FSM_ACTION_TYPES.DIGIT;
      digit: string;
    }
  | { type: typeof MASKED_INPUT_FSM_ACTION_TYPES.BACKSPACE }
  | {
      type: typeof MASKED_INPUT_FSM_ACTION_TYPES.SYNC_TEXT;
      text: string;
    }
  | { type: typeof MASKED_INPUT_FSM_ACTION_TYPES.RESET };

type MaskGroup = {
  leadingLiterals: string;
  digitCount: number;
  trailingLiterals: string;
};

function parseMaskGroups(
  pattern: string,
  digitChar: string,
): MaskGroup[] {
  const groups: MaskGroup[] = [];
  let index = 0;
  let pendingLeading = '';

  while (index < pattern.length) {
    if (pattern[index] !== digitChar) {
      pendingLeading += pattern[index];
      index += 1;
      continue;
    }

    let digitCount = 0;
    while (
      index < pattern.length &&
      pattern[index] === digitChar
    ) {
      digitCount += 1;
      index += 1;
    }

    let trailingLiterals = '';
    while (
      index < pattern.length &&
      pattern[index] !== digitChar
    ) {
      trailingLiterals += pattern[index];
      index += 1;
    }

    groups.push({
      leadingLiterals: pendingLeading,
      digitCount,
      trailingLiterals,
    });
    pendingLeading = '';
  }

  return groups;
}

export class MaskedInputFsm {
  readonly mask: string;
  readonly maxDigits: number;
  readonly displayMaxLength: number;

  private readonly groups: MaskGroup[];
  private readonly digitChar: string;

  constructor(mask: string, digitChar = '0') {
    this.mask = mask;
    this.digitChar = digitChar;
    this.groups = parseMaskGroups(mask, digitChar);
    this.maxDigits = this.groups.reduce(
      (sum, group) => sum + group.digitCount,
      0,
    );
    this.displayMaxLength = mask.length;
  }

  createState(): MaskedInputFsmState {
    return this.buildState('');
  }

  extractDigits(text: string): string {
    return text.replace(/\D/g, '').slice(0, this.maxDigits);
  }

  format(digits: string): string {
    const normalized = digits.slice(0, this.maxDigits);
    if (normalized.length === 0) {
      return '';
    }

    let result = '';
    let digitIndex = 0;

    for (const group of this.groups) {
      const groupDigits = normalized.slice(
        digitIndex,
        digitIndex + group.digitCount,
      );
      if (groupDigits.length === 0) {
        break;
      }

      result += group.leadingLiterals + groupDigits;

      const groupComplete =
        groupDigits.length === group.digitCount;
      const hasDigitsInNextGroup =
        digitIndex + groupDigits.length < normalized.length;

      if (groupComplete && hasDigitsInNextGroup) {
        result += group.trailingLiterals;
      }

      digitIndex += groupDigits.length;

      if (!groupComplete) {
        break;
      }
    }

    return result;
  }

  reduce(
    state: MaskedInputFsmState,
    event: MaskedInputFsmEvent,
  ): MaskedInputFsmState {
    switch (event.type) {
      case MASKED_INPUT_FSM_ACTION_TYPES.RESET:
        return this.createState();

      case MASKED_INPUT_FSM_ACTION_TYPES.SYNC_TEXT: {
        const digits = this.extractDigits(event.text);

        if (digits === state.digits) {
          const isDeletion =
            event.text.length < state.masked.length &&
            this.canBackspace(state);

          if (isDeletion) {
            return this.buildState(
              state.digits.slice(0, -1),
            );
          }

          return state;
        }

        return this.buildState(digits);
      }

      case MASKED_INPUT_FSM_ACTION_TYPES.DIGIT: {
        if (!this.canAppendDigit(state)) {
          return state;
        }
        const digit = event.digit.replace(/\D/g, '');
        if (digit.length !== 1) {
          return state;
        }
        return this.buildState(state.digits + digit);
      }

      case MASKED_INPUT_FSM_ACTION_TYPES.BACKSPACE: {
        if (!this.canBackspace(state)) {
          return state;
        }
        return this.buildState(state.digits.slice(0, -1));
      }

      default:
        return state;
    }
  }

  isComplete(state: MaskedInputFsmState): boolean {
    return (
      state.phase === MASKED_INPUT_PHASE_TYPES.COMPLETE
    );
  }

  canAppendDigit(state: MaskedInputFsmState): boolean {
    return (
      state.phase !== MASKED_INPUT_PHASE_TYPES.COMPLETE
    );
  }

  canBackspace(state: MaskedInputFsmState): boolean {
    return state.phase !== MASKED_INPUT_PHASE_TYPES.EMPTY;
  }

  private buildState(digits: string): MaskedInputFsmState {
    const normalized = digits.slice(0, this.maxDigits);
    return {
      phase: this.phaseFromDigitCount(normalized.length),
      digits: normalized,
      masked: this.format(normalized),
    };
  }

  private phaseFromDigitCount(
    count: number,
  ): MaskedInputPhase {
    if (count === 0) {
      return MASKED_INPUT_PHASE_TYPES.EMPTY;
    }
    if (count < this.maxDigits) {
      return MASKED_INPUT_PHASE_TYPES.PARTIAL;
    }
    return MASKED_INPUT_PHASE_TYPES.COMPLETE;
  }
}
