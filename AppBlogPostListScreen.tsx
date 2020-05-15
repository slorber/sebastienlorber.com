import React from 'react';
import { ScrollView } from 'react-native';
import AppBlogPostList, { AppBlogPost } from './AppBlogPostList';
import { Card } from 'react-native-paper';
import { sortBy, clamp } from 'lodash';

import { useNavigation } from '@react-navigation/native';
import { useDimensions } from '@react-native-community/hooks';

const clampWidth = (width: number) => clamp(width, 0, 600);

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
}) => {
  const { window } = useDimensions();
  const width = clampWidth(window.width * 0.8);
  return (
    <Card onPress={onPress} style={{ width, marginVertical: 20 }} elevation={8}>
      <Card.Title
        title={blogPost.frontmatter.title}
        subtitle={blogPost.frontmatter.excerpt}
      />
      <Card.Cover
        source={blogPost.frontmatter.hero}
        style={{ height: width / 2.5 }}
      />
    </Card>
  );
};

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
        paddingVertical: 10,
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
