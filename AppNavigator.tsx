import React, { lazy, Component, Suspense } from 'react';
import { View, Text, ScrollView } from 'react-native';
import TestMDXScreen from './content/posts/2019-08-20-my-first-post-using-novela-by-narative/index.mdx';

class AppNavigator extends Component {
  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <TestMDXScreen />
      </ScrollView>
    );
  }
}

export default AppNavigator;
