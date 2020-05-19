import React from 'react';
import { getBlogPostBySlug } from './AppBlogPostList';
import AppBlogPostListScreen from './AppBlogPostListScreen';
import AppBlogPostScreen from './AppBlogPostScreen';
import AppHomeScreen from './AppHomeScreen';

import {
  NavigationContainer,
  useRoute,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorMode } from 'theme/useColorMode';
import { View, Platform } from 'react-native';
import { useBodyWidth } from './AppHooks';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
};

const Stack = createStackNavigator();

const getBlogPostFromParams = (params: any) => {
  const { slug } = params as { slug: string };
  return getBlogPostBySlug(slug);
};

const BlogPostScreen = () => (
  <AppBlogPostScreen blogPost={getBlogPostFromParams(useRoute().params)} />
);

const SimpleMDXScreen = () => {
  // extension is required for web!
  const width = useBodyWidth();

  const MDXComponent = require('./content/test/simpleMDX.mdx.jsx').default;
  return (
    <View style={{ padding: 40 }}>
      <View style={{ width, alignSelf: 'center' }}>
        <MDXComponent />
      </View>
    </View>
  );
};

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={AppHomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="SimpleMDX"
        component={SimpleMDXScreen}
        options={{
          title: 'Simple MDX',
        }}
      />
      <Stack.Screen
        name="BlogPostList"
        component={AppBlogPostListScreen}
        options={{
          title: 'All my posts',
        }}
      />
      <Stack.Screen
        name="BlogPost"
        component={BlogPostScreen}
        options={({ route }) => ({
          title: getBlogPostFromParams(route.params).frontmatter.title,
        })}
      />
    </Stack.Navigator>
  );
};

const Linking = {
  prefixes: ['https://sebastienlorber.com', 'slorber://'],
  config: {
    Home: '',
    BlogPostList: 'posts',
    BlogPost: {
      path: 'posts/:slug',
    },
  },
};

const AppNavigator = () => {
  const [colorMode] = useColorMode();
  return (
    <NavigationContainer
      theme={colorMode === 'dark' ? DarkTheme : LightTheme}
      // TODO why does it mess up to pass linking props in native platforms?
      linking={Platform.OS === 'web' ? Linking : undefined}
    >
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
