import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AppBlogPostList, { AppBlogPost } from './AppBlogPostList';
import { Card } from 'react-native-paper';
import { useNavigation, useNavigationParam } from 'react-navigation-hooks';
import AppBlogPostScreen from './AppBlogPostScreen';
import { sortBy } from 'lodash';

const SortedBlogPosts = sortBy(AppBlogPostList,blogPost => blogPost.frontmatter.date).reverse();

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
  const { navigate } = useNavigation();
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
          onPress={() =>
            navigate({ routeName: 'BlogPostScreen', params: { blogPost } })
          }
        />
      ))}
    </ScrollView>
  );
};

const BlogPostScreen = () => {
  const blogPost = useNavigationParam('blogPost') as AppBlogPost;
  return <AppBlogPostScreen blogPost={blogPost} />;
};

const AppStackNavigator = createStackNavigator({
  HomeScreen,
  BlogPostScreen,
});

const AppNavigator = createAppContainer(AppStackNavigator);

export default AppNavigator;
