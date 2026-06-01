import React from 'react';

// Автосгенерированный файл от команды `cosmos-native`
import {
  moduleWrappers,
  rendererConfig,
} from './cosmos.imports';

// Нативный лоадер импортируется из пакета react-cosmos-native
import { NativeFixtureLoader } from 'react-cosmos-native';

function App() {
  return (
    <NativeFixtureLoader
      rendererConfig={rendererConfig}
      moduleWrappers={moduleWrappers}
    />
  );
}

export default App;
