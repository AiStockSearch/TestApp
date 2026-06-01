import React, { useState } from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Keyboard, Platform } from 'react-native';

import type {
  EmitterSubscription,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from 'react-native';
type KeyboardAwareAnchorProps = {
  extraOffset?: number;
  children: (coordY: number) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scrollTo: (props: {
    y: number;
    animated: boolean;
  }) => void;
  onTouchStart?: () => void;
};

export const KeyboardAwareAnchor: React.FC<
  KeyboardAwareAnchorProps
> = ({
  scrollTo,
  extraOffset = 20,
  children,
  style,
  onTouchStart,
}): React.JSX.Element => {
  const [coordY, setCoordY] = useState<number | null>(null);
  const ref = React.useRef<EmitterSubscription | null>(
    null,
  );

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios'
        ? 'keyboardWillShow'
        : 'keyboardDidShow';

    ref.current = Keyboard.addListener(showEvent, () => {
      if (coordY !== null) {
        scrollTo({
          y: Math.max(0, coordY - extraOffset),
          animated: true,
        });
      }
    });

    return () => {
      ref.current?.remove();
    };
  }, [coordY, scrollTo, extraOffset]);

  const handleLayout = (e: LayoutChangeEvent) => {
    const { y } = e?.nativeEvent?.layout || { y: 0 };
    if (y && y !== coordY) {
      setCoordY(y);
    }
  };
  const validatedCoordY = (coordY || 0) - extraOffset;
  return (
    <View
      onTouchStart={onTouchStart}
      onLayout={handleLayout}
      style={style}
    >
      {children(validatedCoordY <= 0 ? 0 : validatedCoordY)}
    </View>
  );
};
