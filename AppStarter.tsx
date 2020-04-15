import React from 'react';
import { View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MDXProvider } from '@mdx-js/react';
import { AppearanceProvider } from 'react-native-appearance';

import AppMDXComponents from './AppMDXComponents';
import AppNavigator from './AppNavigator';

const AppStarter = () => {
  return (
    <AppearanceProvider>
      <SafeAreaProvider>
        <MDXProvider components={AppMDXComponents}>
          <AppNavigator />
        </MDXProvider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

// TODO hack to fix web issue, does not work yet
const provideThemeUIForWeb = Comp => {
  if (Platform.OS === 'web') {
    const ThemeProvider = require('theme-ui').ThemeProvider;
    return () => (
      <ThemeProvider>
        <Comp />
      </ThemeProvider>
    );
  }
  return Comp;
};

export default provideThemeUIForWeb(AppStarter);
