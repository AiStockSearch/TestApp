// src/domain/validation/FieldFsmManager.ts

type TValidationSubState = [boolean, string | null];

// Контракт: [editable, [error, errorText], [success, successText]]
export type TInputValidationResult = [
  boolean,
  TValidationSubState,
  TValidationSubState,
];

export type TPasswordValidationResult = [
  boolean,
  TValidationSubState,
];

export interface IFsmFieldConfig {
  value: string;
  state: TFieldState;
  localErrorText: string;
  serverErrorText: string | null; // Ошибка с бэка, которая может прийти динамически
  successText: string;
}
const SUBMITTING = 'SUBMITTING';
const PRISTINE = 'PRISTINE';
const TYPING = 'TYPING';
const INVALID = 'INVALID';
const VALID = 'VALID';
const SERVER_INVALID = 'SERVER_INVALID';

export const FIELD_FSM_ACTION_TYPES = {
  SUBMITTING,
  PRISTINE,
  TYPING,
  INVALID,
  VALID,
  SERVER_INVALID,
} as const;

export type TFieldState =
  | typeof FIELD_FSM_ACTION_TYPES.PRISTINE
  | typeof FIELD_FSM_ACTION_TYPES.TYPING
  | typeof FIELD_FSM_ACTION_TYPES.VALID
  | typeof FIELD_FSM_ACTION_TYPES.INVALID
  | typeof FIELD_FSM_ACTION_TYPES.SERVER_INVALID
  | typeof FIELD_FSM_ACTION_TYPES.SUBMITTING;

export class FieldPhoneFsmManager {
  private static readonly PHONE_REGEX =
    /^\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

  public static getNextState(
    currentText: string,
    isSubmitting: boolean,
    hasServerError: boolean,
  ): TFieldState {
    if (isSubmitting) {
      return FIELD_FSM_ACTION_TYPES.SUBMITTING;
    }
    if (currentText === '') {
      return FIELD_FSM_ACTION_TYPES.PRISTINE;
    }
    if (hasServerError) {
      return FIELD_FSM_ACTION_TYPES.SERVER_INVALID;
    }
    if (currentText.length < 15) {
      return FIELD_FSM_ACTION_TYPES.TYPING;
    }

    return this.PHONE_REGEX.test(currentText)
      ? FIELD_FSM_ACTION_TYPES.VALID
      : FIELD_FSM_ACTION_TYPES.INVALID;
  }

  public static transformToUiContract(
    config: IFsmFieldConfig,
  ): TInputValidationResult {
    const {
      state,
      localErrorText,
      serverErrorText,
      successText,
    } = config;

    switch (state) {
      case FIELD_FSM_ACTION_TYPES.SUBMITTING:
        return [false, [false, null], [false, null]];

      case FIELD_FSM_ACTION_TYPES.PRISTINE:
      case TYPING:
        return [true, [false, null], [false, null]];

      case FIELD_FSM_ACTION_TYPES.INVALID:
        // Локальная ошибка (фронтенд маска)
        return [
          true,
          [true, localErrorText],
          [false, null],
        ];

      case FIELD_FSM_ACTION_TYPES.SERVER_INVALID:
        // Ошибка с бэка (приоритет на текст ответа сервера)
        return [
          true,
          [true, serverErrorText ?? 'Ошибка сервера'],
          [false, null],
        ];

      case FIELD_FSM_ACTION_TYPES.VALID:
        return [true, [false, null], [true, successText]];

      default:
        return [true, [false, null], [false, null]];
    }
  }
}
