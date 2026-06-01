import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import { useActivatedLocale } from '@locales/hooks/useActivatedLocale';

import type { ReactNode } from 'react';

type TLocalesProvider = {
  children: ReactNode;
};

export const LocalesProvider = ({
  children,
}: TLocalesProvider): ReactNode => {
  const { uiFreeze } = useActivatedLocale();

  if (uiFreeze) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
});
