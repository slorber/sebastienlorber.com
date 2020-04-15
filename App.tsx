import 'react-native-gesture-handler';
import React from 'react';
import { Logs } from 'expo';

// https://github.com/expo/expo/issues/2623#issuecomment-441364587
if (__DEV__) {
  const isRemoteDebuggingEnabled = typeof atob !== 'undefined';
  if (isRemoteDebuggingEnabled) {
    Logs.disableExpoCliLogging();
  } else {
    Logs.enableExpoCliLogging();
  }
}

console.disableYellowBox = true;

export default () => {
  const AppStarter = require('./AppStarter').default;
  return <AppStarter />;
};
