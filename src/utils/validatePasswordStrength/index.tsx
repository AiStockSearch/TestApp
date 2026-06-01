export interface IPasswordValidationResult {
  hasMinLength: boolean;
  hasCapitalLetter: boolean;
  hasLowercaseLetter: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  match: boolean;
  isValidAll: boolean;
}

export const validatePasswordStrength = (
  password: string,
  confirmPassword?: string,
): IPasswordValidationResult => {
  const hasMinLength = password.length >= 8;
  const hasCapitalLetter = /[A-Z]/.test(password);
  const hasLowercaseLetter = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar =
    /[!@#$%^&*()+\-={};':"\\|,.<>/?~`[\]]/.test(password);

  const match =
    confirmPassword !== undefined
      ? password === confirmPassword && password.length > 0
      : false;

  const isValidAll =
    hasMinLength &&
    hasCapitalLetter &&
    hasLowercaseLetter &&
    hasNumber &&
    hasSpecialChar &&
    match;

  return {
    hasMinLength,
    hasCapitalLetter,
    hasLowercaseLetter,
    hasNumber,
    hasSpecialChar,
    match,
    isValidAll,
  };
};
