import phoneStep from '@screens/PhoneStep/translation.json';
import createSMS from '@screens/SMSStep/translation.json';
import registrationStep from '@screens/RegistrationStep/translation.json';
import roleStep from '@screens/RoleStep/translation.json';
import profileStep from '@screens/ProfileStep/translation.json';
import validateForm from '@utils/validateForm/translate.json';
import errorMessages from '@utils/validateForm/translate.json';
export default {
  phoneStep: phoneStep.ru,
  createSMS: createSMS.ru,
  registrationStep: registrationStep.ru,
  roleStep: roleStep.ru,
  profileStep: profileStep.ru,
  phoneInput: {
    error: 'Invalid phone number',
    success: 'Phone number is valid',
  },
  validateForm: validateForm.ru,
  errorMessages: errorMessages.ru,
};
