import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AppImage from 'components/AppImage';
import { AppBlogPost } from './AppBlogPostList';
import { optimizeHeavyScreen } from 'react-navigation-heavy-screen';
import { ActivityIndicator } from 'react-native-paper';
import { Transition } from 'react-native-reanimated';
import { useBodyWidth } from './AppHooks';

const AppBlogPostScreen = ({ blogPost }: { blogPost: AppBlogPost }) => {
  const { default: BlogPostMDXComponent, frontmatter } = blogPost;
  const width = useBodyWidth() - 20;
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 20,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AppImage width={width} source={frontmatter.hero} />
      </View>
      <View
        style={{
          marginTop: 30,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width, overflow: 'hidden' }}>
          <BlogPostMDXComponent />
        </View>
      </View>
    </ScrollView>
  );
};

const Placeholder = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ActivityIndicator size="large" />
  </View>
);

export default optimizeHeavyScreen(AppBlogPostScreen, Placeholder, {
  disableHoistStatics: false,
  transition: (
    <Transition.Together>
      <Transition.Change interpolation="easeInOut" durationMs={400} />
      <Transition.In type="fade" durationMs={400} />
    </Transition.Together>
  ),
});
