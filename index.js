/**
 * @format
 */

import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './App';
import AppCosmos from './App.cosmos';
import { name as appName } from './app.json';

if (__DEV__) {
  require('./ReactotronConfig'); // Adjust path depending on where you saved it
}

const cosmosEnabled = false;

AppRegistry.registerComponent(appName, () =>
  cosmosEnabled ? AppCosmos : App,
);
