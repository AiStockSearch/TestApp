import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import ButtonBlock from '../ButtonBlock'; // скорректируй путь к компоненту

// Обертка для предсказуемого отображения на холсте Cosmos
const Decorator = ({
  children,
}: {
  children: React.ReactNode;
}) => <View style={styles.container}>{children}</View>;

const handlePhoneNumberPress = () => {
  Alert.alert('handlePhoneNumberPress');
};
const handleForgotPasswordPress = () => {
  Alert.alert('handleForgotPasswordPress');
};

export default {
  'Дефолтное состояние': (
    <Decorator>
      <ButtonBlock
        dontHaveAccountText="У вас еще нет аккаунта?"
        haveAccountText="Войти по номеру:"
        rememberMeButton="Забыли пароль?"
        phoneNumber="+7 (707) 777-77-77"
        handlePhoneNumberPress={handlePhoneNumberPress}
        handleForgotPasswordPress={
          handleForgotPasswordPress
        }
      />
    </Decorator>
  ),
  'Длинные тексты (Проверка на переполнение)': (
    <Decorator>
      <ButtonBlock
        dontHaveAccountText="Если у вас по какой-то причине всё еще нет учетной записи в нашей системе"
        haveAccountText="Вы можете попробовать выполнить вход, используя ваш зарегистрированный телефонный номер:"
        rememberMeButton="Восстановить доступ к аккаунту (Забыли пароль?)"
        phoneNumber="+7 (777) 999-88-77"
        handlePhoneNumberPress={handlePhoneNumberPress}
        handleForgotPasswordPress={
          handleForgotPasswordPress
        }
      />
    </Decorator>
  ),
  'Пустые строки / Минималистичный вид': (
    <Decorator>
      <ButtonBlock
        dontHaveAccountText=""
        haveAccountText="Вход:"
        rememberMeButton="Сброс"
        phoneNumber="+77001112233"
        handlePhoneNumberPress={handlePhoneNumberPress}
        handleForgotPasswordPress={
          handleForgotPasswordPress
        }
      />
    </Decorator>
  ),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff', // или используй colors.background.primary, если доступен
  },
  contentPlaceholderBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5c2e7',
  },
  contentPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5c2e7',
  },
  devActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  text: {
    color: '#252526',
    fontSize: 16,
    fontWeight: '600',
  },
});
