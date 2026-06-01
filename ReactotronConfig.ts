import { config } from './config/config';

import Reactotron from 'reactotron-react-native';

// Ensure this only initializes in a development environment
if (__DEV__) {
  Reactotron.configure({
    name: config.name, // The name displayed in the Reactotron Desktop app
    host: config.host,
    port: config.port,
  })
    .useReactNative({
      asyncStorage: config.asyncStorage, // Turn on if you install the async-storage tracking plugin
      networking: config.networking, // Prevents internal Metro bundler chatter from clogging your timeline
    })
    .connect(); // Connect to the desktop client

  // Clear Reactotron on every fresh app reload
  Reactotron.clear();

  // Extend the global console object so you can call console.tron.log() anywhere!
  // eslint-disable-next-line no-console
  console.tron = Reactotron;
}
