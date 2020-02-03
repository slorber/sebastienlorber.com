import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MDXProvider } from '@mdx-js/react';

import AppNavigator from './AppNavigator';
import AppMDXComponents from './AppMDXComponents';

const App = () => {
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

export default App;
