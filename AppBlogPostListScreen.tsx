import React from 'react';
import { ScrollView } from 'react-native';
import AppBlogPostList, { AppBlogPost } from './AppBlogPostList';
import { Card } from 'react-native-paper';
import { sortBy } from 'lodash';

import { useNavigation } from '@react-navigation/native';

let BlogPosts = sortBy(
  AppBlogPostList,
  (blogPost) => blogPost.frontmatter.date,
).reverse();

const ShowSecretBlogPostsInDev = false; // toggle this if needed

BlogPosts =
  __DEV__ && ShowSecretBlogPostsInDev
    ? BlogPosts
    : BlogPosts.filter((blogPost) => !blogPost.frontmatter.secret);

const AppBlogPostListCard = ({
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

const AppBlogPostListScreen = () => {
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
      {BlogPosts.map((blogPost, i) => (
        <AppBlogPostListCard
          blogPost={blogPost}
          key={i}
          onPress={() => navigation.navigate('BlogPost', { blogPost })}
        />
      ))}
    </ScrollView>
  );
};
export default AppBlogPostListScreen;
