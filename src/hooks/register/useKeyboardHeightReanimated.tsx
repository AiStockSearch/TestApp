import { useEffect } from 'react';
import { Platform } from 'react-native';
import { Keyboard } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';
import { withTiming } from 'react-native-reanimated';
import { Easing } from 'react-native-reanimated';
import { useAnimatedStyle } from 'react-native-reanimated';

export const useKeyboardHeightReanimated = () => {
  const keyboardHeight = useSharedValue(0);

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios'
        ? 'keyboardWillShow'
        : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios'
        ? 'keyboardWillHide'
        : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(
      showEvent,
      (e) => {
        // Плавно поднимаем контент, подстраиваясь под скорость клавиатуры
        keyboardHeight.value = withTiming(
          e.endCoordinates.height,
          {
            duration: e.duration || 250,
            easing: Easing.out(Easing.ease),
          },
        );
      },
    );

    const hideSubscription = Keyboard.addListener(
      hideEvent,
      (e) => {
        // Плавно опускаем контент обратно
        keyboardHeight.value = withTiming(0, {
          duration: e?.duration || 200,
          easing: Easing.out(Easing.ease),
        });
      },
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Создаем анимированный стиль для паддинга
  const animatedStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: keyboardHeight.value,
    };
  });

  return { animatedStyle };
};
