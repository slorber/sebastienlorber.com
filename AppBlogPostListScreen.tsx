import React from 'react';
import { ScrollView } from 'react-native';
import { AppBlogPost, AppBlogPosts } from './AppBlogPostList';
import { Card } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useBodyWidth } from './AppHooks';

const AppBlogPostListCard = ({
  blogPost,
  onPress,
}: {
  blogPost: AppBlogPost;
  onPress: () => void;
}) => {
  const imageRatio = 2.5;
  const width = useBodyWidth() - 20;
  return (
    <Card onPress={onPress} style={{ width, marginVertical: 20 }} elevation={8}>
      <Card.Title
        title={blogPost.frontmatter.title}
        subtitle={blogPost.frontmatter.excerpt}
      />
      <Card.Cover
        source={blogPost.frontmatter.hero}
        style={{ width, height: width / imageRatio }}
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
      {AppBlogPosts.map((blogPost, i) => (
        <AppBlogPostListCard
          blogPost={blogPost}
          key={i}
          onPress={() =>
            navigation.navigate('BlogPost', { slug: blogPost.frontmatter.slug })
          }
        />
      ))}
    </ScrollView>
  );
};
export default AppBlogPostListScreen;
