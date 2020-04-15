import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import ExpoDarkModeSwitch from 'expo-dark-mode-switch';
import * as Permissions from 'expo-permissions';
import MobilePhoneView from 'components/MobilePhoneView';
import AppButton from 'components/designSystem/AppButton';
import AppRevealView from 'components/designSystem/AppRevealView';
import * as Battery from 'expo-battery';
import ExpoGesturesExample from './ExpoGesturesExample';
import ExpoImagePickerExample from './ExpoImagePickerExample';
import { Video } from 'expo-av';
import { useColorMode } from 'theme/useColorMode';
import TigerSvg from "./TigerSvg"

export const ExpoCameraDemo = () => {
  const [showCamera, setShowCamera] = useState(false);
  return (
    <MobilePhoneView safeAreaPaddingTop={0}>
      {showCamera ? (
        <AppRevealView
          // Workaround because onCameraReady fires at mount time in web (but camera does not display anything yet)
          delay={2000}
        >
          <Camera style={{ flex: 1, width: '100%' }} />
        </AppRevealView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AppButton
            onPress={async () => {
              const result = await Permissions.askAsync(Permissions.CAMERA);
              if (result.status === 'granted') {
                setShowCamera(true);
              }
            }}
          >
            Show expo-camera
          </AppButton>
        </View>
      )}
    </MobilePhoneView>
  );
};

export const ExpoDarkModeSwitchDemo = () => {
  const [colorMode, setColorMode] = useColorMode();
  return (
    <MobilePhoneView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ExpoDarkModeSwitch
        value={colorMode === 'dark'}
        onChange={value => setColorMode(value ? 'dark' : 'light')}
      />
    </MobilePhoneView>
  );
};

export const ExpoBatteryDemo = () => {
  const [battery, setBattery] = useState(undefined);

  useEffect(() => {
    let canceled = false;
    const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
      setBattery(batteryLevel);
    });
    Battery.getBatteryLevelAsync().then(batteryLevel => {
      if (!canceled) setBattery(batteryLevel);
    });
    return () => {
      canceled = true;
      subscription.remove();
    };
  }, []);

  return (
    <MobilePhoneView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text>Battery level = {battery}</Text>
    </MobilePhoneView>
  );
};

export const ExpoGesturesDemo = () => {
  return (
    <MobilePhoneView safeAreaPaddingTop={20} style={{ padding: 20 }}>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: 'black',
          borderStyle: 'dashed',
        }}
      >
        <ExpoGesturesExample />
      </View>
    </MobilePhoneView>
  );
};

export const ExpoSvgDemo = () => {
  return (
    <MobilePhoneView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <TigerSvg height="90%" width="90%" />
    </MobilePhoneView>
  );
};

export const ExpoVideoDemo = () => {
  return (
    <MobilePhoneView
      safeAreaPaddingTop={0}
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <Video
        source={{
          uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        rate={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        style={{ width: '100%' }}
      />
    </MobilePhoneView>
  );
};

export const ExpoImagePickerDemo = () => {
  return (
    <MobilePhoneView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ExpoImagePickerExample />
    </MobilePhoneView>
  );
};
