import React from 'react';
import { AppBlogPost } from './AppBlogPostList';
import AppBlogPostListScreen from './AppBlogPostListScreen';
import AppBlogPostScreen from './AppBlogPostScreen';

import {
  NavigationContainer,
  useRoute,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorMode } from 'theme/useColorMode';

const Stack = createStackNavigator();

const BlogPostScreen = () => {
  const { blogPost } = useRoute().params as { blogPost: AppBlogPost };
  return <AppBlogPostScreen blogPost={blogPost} />;
};

const AppNavigator = () => {
  const [colorMode] = useColorMode();
  return (
    <NavigationContainer
      theme={colorMode === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator>
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
