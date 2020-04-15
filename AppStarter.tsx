import React from 'react';
import { View } from 'react-native';
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
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
            }}
          >
            <AppNavigator />
          </View>
        </MDXProvider>
      </SafeAreaProvider>
    </AppearanceProvider>
  );
};

export default AppStarter;
