import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import colors from '@/styles/colors';

const CHECKBOX_SIZE = 22;
const CHECKBOX_BORDER_RADIUS = 6;
const CHECKBOX_BORDER_WIDTH = 2;
const WRAPPER_GAP = 8;
const WRAPPER_PADDING_VERTICAL = 8;
const CHECKMARK_PADDING = 4;
const CHECKMARK_RADIUS = 3;
const ANIMATION_FRICTION = 7;
const ANIMATION_TENSION = 140;
const PRESS_SCALE = 0.9;
const PRESS_FRICTION = 6;
const PRESS_TENSION = 220;
const CHECK_OPACITY_MID = 0.35;
const CHECK_OPACITY_END = 0.65;
const CHECK_SCALE_MID = 0.55;
const CHECK_SCALE_START = 0.35;
const CHECK_SCALE_PEAK = 1.12;

type CheckBoxWrapperProps = {
  checked: boolean;
  onPress: () => void;
  children: React.ReactNode;
};

const CheckBoxWrapper = ({
  checked,
  onPress,
  children,
}: CheckBoxWrapperProps): React.JSX.Element => {
  const progress = useRef(
    new Animated.Value(checked ? 1 : 0),
  ).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: checked ? 1 : 0,
      friction: ANIMATION_FRICTION,
      tension: ANIMATION_TENSION,
      useNativeDriver: false,
    }).start();
  }, [checked, progress]);

  const handlePressIn = (): void => {
    Animated.spring(pressScale, {
      toValue: PRESS_SCALE,
      friction: PRESS_FRICTION,
      tension: PRESS_TENSION,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (): void => {
    Animated.spring(pressScale, {
      toValue: 1,
      friction: PRESS_FRICTION,
      tension: PRESS_TENSION,
      useNativeDriver: true,
    }).start();
  };

  const backgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      colors.checkbox.background,
      colors.text.link,
    ],
  });

  const borderColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.checkbox.border, colors.text.link],
  });

  const checkOpacity = progress.interpolate({
    inputRange: [0, CHECK_OPACITY_MID, 1],
    outputRange: [0, CHECK_OPACITY_END, 1],
  });

  const checkScale = progress.interpolate({
    inputRange: [0, CHECK_SCALE_MID, 1],
    outputRange: [CHECK_SCALE_START, CHECK_SCALE_PEAK, 1],
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.wrapper}
    >
      <Animated.View
        style={[
          styles.pressScale,
          {
            transform: [{ scale: pressScale }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.checkbox,
            {
              backgroundColor,
              borderColor,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.checkmark,
              {
                opacity: checkOpacity,
                transform: [{ scale: checkScale }],
              },
            ]}
          >
            <View style={styles.innerMark} />
          </Animated.View>
        </Animated.View>
      </Animated.View>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignItems: 'center',
    borderRadius: CHECKBOX_BORDER_RADIUS,
    borderWidth: CHECKBOX_BORDER_WIDTH,
    height: CHECKBOX_SIZE,
    justifyContent: 'center',
    overflow: 'hidden',
    width: CHECKBOX_SIZE,
  },
  checkmark: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  innerMark: {
    backgroundColor: colors.checkbox.border,
    borderRadius: CHECKMARK_RADIUS,
    padding: CHECKMARK_PADDING,
  },
  pressScale: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: WRAPPER_GAP,
    paddingVertical: WRAPPER_PADDING_VERTICAL,
  },
});

export default CheckBoxWrapper;
