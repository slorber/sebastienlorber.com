import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './AppNavigator';
import { MDXProvider } from '@mdx-js/react';
import AppMDXComponents from './AppMDXComponents';

const App = () => {
  return (
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
  );
};

export default App;
