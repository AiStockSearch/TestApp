import React, { type JSX } from 'react';
import { StyleSheet } from 'react-native';

import { ThemeProvider } from '@/styles/colors';
import { LocalesManager } from '@locales';
import { RootNavigator } from '@navigation';
import { NavigationContainer } from '@react-navigation/native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <LocalesManager.provider.localesProvider>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.root}>
            <NavigationContainer>
              <RootNavigator />
            </NavigationContainer>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </LocalesManager.provider.localesProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
