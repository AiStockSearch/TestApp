import { StyleSheet } from 'react-native';
import { View } from 'react-native';

import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type TBoxProps = {
  children: ReactNode;
  debug?: boolean;
  customStyle?: StyleProp<ViewStyle>;
};

const IBox = ({
  children,
  customStyle,
}: TBoxProps): React.JSX.Element => {
  return <View style={customStyle}>{children}</View>;
};

const IInsetsBox = ({
  children,
  customStyle,
}: TBoxProps): React.JSX.Element => {
  const insets = useSafeAreaInsets();
  const style = StyleSheet.create({
    container: {
      paddingBottom: insets.bottom,
      paddingTop: insets.top,
      padding: 16,
    },
  });
  return (
    <View style={[style.container, customStyle]}>
      {children}
    </View>
  );
};

export { IBox, IInsetsBox };
