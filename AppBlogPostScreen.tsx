import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { AppBlogPost } from './AppBlogPostList';
import { optimizeHeavyScreen } from 'react-navigation-heavy-screen';
import { ActivityIndicator } from 'react-native-paper';
import { useDimensions } from '@react-native-community/hooks';
import { Transition } from 'react-native-reanimated';

const AppBlogPostScreen = ({ blogPost }: { blogPost: AppBlogPost }) => {
  const { default: MDXBlogPostComp, frontmatter } = blogPost;
  const { window } = useDimensions();
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
          {frontmatter.title}
        </Text>
      </View>
      <View
        style={{
          marginTop: 20,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <AutoHeightImage width={window.width - 40} source={frontmatter.hero} />
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: window.width - 40, overflow: 'hidden' }}>
          <MDXBlogPostComp />
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
      <Transition.Change interpolation="easeInOut" durationMs={400}/>
      <Transition.In type="fade" durationMs={400} />
    </Transition.Together>
  ),
});
