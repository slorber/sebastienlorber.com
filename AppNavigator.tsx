import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AppBlogPostList, { AppBlogPost } from './AppBlogPostList';
import { Card } from 'react-native-paper';
import AppBlogPostScreen from './AppBlogPostScreen';
import { sortBy, last } from 'lodash';

import {
  NavigationContainer,
  useNavigation,
  useNavigationState,
  useRoute,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useColorMode } from 'theme/useColorMode';

const Stack = createStackNavigator();

const SortedBlogPosts = sortBy(
  AppBlogPostList,
  blogPost => blogPost.frontmatter.date,
).reverse();

const HomeBlogPostCard = ({
  blogPost,
  onPress,
}: {
  blogPost: AppBlogPost;
  onPress: () => void;
}) => (
  <Card onPress={onPress} style={{ width: '80%', marginVertical: 20 }}>
    <Card.Title
      title={blogPost.frontmatter.title}
      subtitle={blogPost.frontmatter.excerpt}
    />
    <Card.Cover source={blogPost.frontmatter.hero} />
  </Card>
);

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView
      style={{
        flex: 1,
        width: '100%',
      }}
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
      }}
    >
      {SortedBlogPosts.map((blogPost, i) => (
        <HomeBlogPostCard
          blogPost={blogPost}
          key={i}
          onPress={() => navigation.navigate('BlogPost', { blogPost })}
        />
      ))}
    </ScrollView>
  );
};

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
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}
        />
        <Stack.Screen
          name="BlogPost"
          component={BlogPostScreen}
          options={({route}) => ({
            title: (route.params as any).blogPost.frontmatter.title,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
