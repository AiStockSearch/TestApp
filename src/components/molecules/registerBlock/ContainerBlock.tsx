import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';

import { CustomHeader } from '@/components/atoms/IHeader';
import ProgressBarWrapper from '@/components/atoms/ProgressBarWrapper';
import { useKeyboardHeightReanimated } from '@/hooks/register/useKeyboardHeightReanimated';
import colors from '@/styles/colors';

import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ContainerBlock = React.forwardRef(
  (
    {
      children,
      actions,
      withoutTab,
      translation,
      progressBarActive,
    }: {
      children: React.ReactNode;
      actions: { onBack: () => void; onClose: () => void };
      translation: { navBarTitle: string };
      progressBarActive: boolean[];
      withoutTab?: boolean;
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();
    const scrollViewRef = useRef<ScrollView>(null);
    const { animatedStyle } = useKeyboardHeightReanimated();

    React.useImperativeHandle(ref, () => ({
      scrollTo: (y: number) => {
        scrollViewRef.current?.scrollTo({
          y,
          animated: true,
        });
      },
    }));

    return (
      <View
        style={{
          backgroundColor: colors.background.primary,
          flex: 1,
          paddingTop: insets.top,
        }}
      >
        <CustomHeader
          localized={true}
          onBack={actions.onBack}
          onClose={actions.onClose}
          title={translation.navBarTitle}
        />

        {!withoutTab ? (
          <ProgressBarWrapper $active={progressBarActive} />
        ) : (
          <View
            style={{
              height: 3,
              backgroundColor: colors.input.border,
            }}
          />
        )}

        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            {
              flexGrow: 1,
              paddingHorizontal: 16,
            },
            {
              paddingTop: insets.top,
              paddingBottom: insets.bottom + 16,
            },
          ]}
        >
          <React.Fragment>{children}</React.Fragment>
        </ScrollView>
        <Animated.View style={animatedStyle} />
      </View>
    );
  },
);
