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
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
        backgroundColor: 'white',
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
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BlogPost" component={BlogPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
