import React from 'react';
import { AppBlogPost } from './AppBlogPostList';
import AppBlogPostListScreen from './AppBlogPostListScreen';
import AppBlogPostScreen from './AppBlogPostScreen';

import {
  NavigationContainer,
  useRoute,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorMode } from 'theme/useColorMode';
import { View } from 'react-native';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();

const BlogPostScreen = () => {
  const { blogPost } = useRoute().params as { blogPost: AppBlogPost };
  return <AppBlogPostScreen blogPost={blogPost} />;
};

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ padding: 40 }}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('SimpleMDX')}
        style={{ margin: 20 }}
      >
        Simple MDX
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('BlogPostList')}
        style={{ margin: 20 }}
      >
        Blog Post List
      </Button>
    </View>
  );
};

const SimpleMDXScreen = () => {
  const navigation = useNavigation();
  const MDXComponent = require('./content/test/simpleMDX.mdx').default;
  return (
    <View style={{ padding: 40 }}>
      <MDXComponent />
    </View>
  );
};

const AppNavigator = () => {
  const [colorMode] = useColorMode();
  return (
    <NavigationContainer
      theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
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
            title: (route.params as any).blogPost.frontmatter.title,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
