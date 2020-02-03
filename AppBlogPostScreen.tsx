import React, { lazy, Component, Suspense } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { useSafeArea } from 'react-native-safe-area-context';

const ScreenWidth = Dimensions.get('window').width;

const AppBlogPostScreen = ({ mdxBlogPostRequire }) => {
  const MDXBlogPostComp = mdxBlogPostRequire.default;
  const frontmatter = mdxBlogPostRequire._frontmatter;
  const insets = useSafeArea();
  return (
    <ScrollView style={{ flex: 1, marginTop: insets.top }}>
      <View
        style={{
          marginTop: 20,
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
        <AutoHeightImage width={ScreenWidth - 40} source={frontmatter.hero} />
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: ScreenWidth - 40, overflow: 'hidden' }}>
          <MDXBlogPostComp />
        </View>
      </View>
    </ScrollView>
  );
};

export default AppBlogPostScreen;
