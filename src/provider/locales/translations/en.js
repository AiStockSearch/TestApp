import createSMS from '@screens/SMSStep/translation.json';
import phoneStep from '@screens/PhoneStep/translation.json';
import registrationStep from '@screens/RegistrationStep/translation.json';
import roleStep from '@screens/RoleStep/translation.json';
import profileStep from '@screens/ProfileStep/translation.json';
import validateForm from '@utils/validateForm/translate.json';
import errorMessages from '@utils/validateForm/translate.json';
export default {
  phoneInput: {
    error: 'Invalid phone number',
    success: 'Phone number is valid',
  },
  createSMS: createSMS.en,
  phoneStep: phoneStep.en,
  registrationStep: registrationStep.en,
  roleStep: roleStep.en,
  profileStep: profileStep.en,
  validateForm: validateForm.en,
  errorMessages: errorMessages.en,
};
