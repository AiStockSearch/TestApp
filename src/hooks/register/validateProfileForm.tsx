import { useMemo } from 'react';

import * as KEYS from '@/screens/ProfileStep/constants';
import type { ProfileFormState } from '@/screens/ProfileStep/types';
import type { IMaskedFieldState } from '@/screens/ProfileStep/types';
import type { IRegistrationPayload } from '@/screens/ProfileStep/types';
import type { ProfileValidationSchema } from '@/utils/validateForm/index';
import { validateForm as validateFormUtils } from '@/utils/validateForm/index';

import { useTranslation } from 'react-i18next';
import type * as zod from 'zod';

export const useValidateForm = (
  state: ProfileFormState & IRegistrationPayload,
): {
  validateForm: Partial<ProfileValidationSchema> | null;
  errorMessages: Partial<ProfileValidationSchema> | null;
} => {
  const { t } = useTranslation();
  // 1. Memoize the schema extraction so it only runs when 'state' actually changes
  const stateSchema = useMemo(() => {
    // Helper to keep code DRY and handle type casting cleanly
    const getStr = (key: keyof ProfileFormState) =>
      state[key] as string;
    const getMasked = (key: keyof ProfileFormState) =>
      state[key] as IMaskedFieldState;

    return {
      [KEYS.FIRST_NAME]: getStr(KEYS.FIRST_NAME),
      [KEYS.LAST_NAME]: getStr(KEYS.LAST_NAME),
      [KEYS.SECOND_NAME]: getStr(KEYS.SECOND_NAME),
      [KEYS.IIN]: getMasked(KEYS.IIN)?.digits,
      [KEYS.BIRTHDAY]: getMasked(KEYS.BIRTHDAY)?.masked,
      [KEYS.PHONE]: getMasked(KEYS.PHONE)?.digits,
      [KEYS.DOCUMENT]: getMasked(KEYS.DOCUMENT)?.masked,
      [KEYS.DATE_DOCUMENT]: getMasked(KEYS.DATE_DOCUMENT)
        ?.masked,
      [KEYS.ADDRESS_DOCUMENT]: getStr(
        KEYS.ADDRESS_DOCUMENT,
      ),
      [KEYS.NUMBER_DRIVER]: getStr(KEYS.NUMBER_DRIVER),
      [KEYS.DATE_RELEASE]: getMasked(KEYS.DATE_RELEASE)
        ?.masked,
      [KEYS.CITIZENSHIP]: getStr(KEYS.CITIZENSHIP),
      [KEYS.CATEGORY]: getStr(KEYS.CATEGORY),
    };
  }, [state, t]); // Only recalculates if the 'state' object reference changes

  // 2. Run the validation once based on the memoized schema
  const validationResult = useMemo(() => {
    return validateFormUtils.profileValidationSchema(
      stateSchema as unknown as ProfileValidationSchema,
    );
  }, [stateSchema]);

  // 3. Derive error messages efficiently without an O(N^2) array allocation loop
  const errorMessages = useMemo(() => {
    if (
      !validationResult ||
      !(
        validationResult as zod.ZodError<ProfileValidationSchema>
      ).errors
    ) {
      return null;
    }

    const errorsMap: Partial<ProfileValidationSchema> = {};
    for (const error of (
      validationResult as zod.ZodError<ProfileValidationSchema>
    ).errors) {
      errorsMap[
        error.path[0] as keyof ProfileValidationSchema
      ] = t(`${error.message}`);
    }
    return errorsMap;
  }, [validationResult]);

  return {
    validateForm:
      validationResult as Partial<ProfileValidationSchema>,
    errorMessages: errorMessages,
  };
};
