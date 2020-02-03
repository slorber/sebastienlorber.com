import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MDXProvider } from '@mdx-js/react';

import AppMDXComponents from './AppMDXComponents';
import AppBlogPostScreen from './AppBlogPostScreen';


const AppNavigator = () => {
  return (
    <AppBlogPostScreen
      mdxBlogPostRequire={require('./content/posts/2019-08-20-my-first-post-using-novela-by-narative/index.mdx')}
      //mdxBlogPostRequire={require('./content/posts/2019-08-30-handling-race-conditions-in-react/index.mdx')}
      //mdxBlogPostRequire={require('./content/posts/2020-01-27-running-expo-inside-a-gatsby-blog-post/index.mdx')}
    />
  );
};


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
