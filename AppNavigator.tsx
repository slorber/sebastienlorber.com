import React, { lazy, Component, Suspense } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import TestMDXScreen, {
  _frontmatter,
} from './content/posts/2019-08-20-my-first-post-using-novela-by-narative/index.mdx';
import AutoHeightImage from 'react-native-auto-height-image';
import { useSafeArea } from 'react-native-safe-area-context';

const ScreenWidth = Dimensions.get('window').width;

const AppNavigator = () => {
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
        <AutoHeightImage width={ScreenWidth - 40} source={_frontmatter.hero} />
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: ScreenWidth - 40, overflow: 'hidden' }}>
          <TestMDXScreen />
        </View>
      </View>
    </ScrollView>
  );
};

export default AppNavigator;
