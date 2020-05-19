import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useBodyWidth } from './AppHooks';
import { ReactLogo } from './src/components/AppSvgs';
import { SLLogo } from './src/components/AppSvgs';
import { useColorMode } from 'theme/useColorMode';
import Switch from 'expo-dark-mode-switch';

const AppHomeScreen = () => {
  const navigation = useNavigation();
  const width = useBodyWidth();
  const [colorMode, setColorMode] = useColorMode();

  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          width,
          padding: 40,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ReactLogo width={width * 0.2} height={width * 0.2} />
          <SLLogo
            width={width * 0.4}
            height={width * 0.4}
            style={{
              fill: colorMode === 'dark' ? 'white' : 'black',
            }}
          />
        </View>
        <View style={{ paddingVertical: 30 }}>
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              color: colorMode === 'dark' ? 'white' : 'black',
            }}
          >
            Welcome to my personal mobile app!
          </Text>
        </View>
        <View style={{ paddingVertical: 30 }}>
          <Switch
            value={colorMode === 'dark'}
            onChange={(v) => setColorMode(v ? 'dark' : 'light')}
          />
        </View>
        <View style={{ paddingVertical: 30 }}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('BlogPostList')}
          >
            Read my blog posts
          </Button>
        </View>
        {/*
        <Button
          mode="contained"
          onPress={() => navigation.navigate('SimpleMDX')}
          style={{ margin: 20 }}
        >
          MDX test
        </Button>
        */}
      </View>
    </ScrollView>
  );
};

export default AppHomeScreen;
