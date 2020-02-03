import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MDXProvider } from '@mdx-js/react';

import AppMDXComponents from './AppMDXComponents';
import AppNavigator from './AppNavigator';

const AppStarter = () => {
  return (
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
  );
};

export default AppStarter;
