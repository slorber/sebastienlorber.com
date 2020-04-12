import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import Switch from 'expo-dark-mode-switch';
import * as Permissions from 'expo-permissions';
import MobilePhoneView from 'components/MobilePhoneView';
import AppButton from 'components/designSystem/AppButton';
import AppRevealView from 'components/designSystem/AppRevealView';
import * as Battery from 'expo-battery';
import ExpoGesturesExample from './ExpoGesturesExample';
import ExpoImagePickerExample from './ExpoImagePickerExample';
import Svg, { Circle, Rect } from 'react-native-svg';
import { Video } from 'expo-av';

export const ExpoCameraDemo = () => {
  const [showCamera, setShowCamera] = useState(false);
  return (
    <MobilePhoneView safeAreaPaddingTop={0}>
      {showCamera ? (
        <AppRevealView delay={1000}>
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

export const ExpoSwitchDemo = () => {
  const [value, setValue] = React.useState(true);
  return (
    <MobilePhoneView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Switch value={value} onChange={value => setValue(value)} />
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
    <MobilePhoneView safeAreaPaddingTop={0}>
      <ExpoGesturesExample />
    </MobilePhoneView>
  );
};

export const ExpoSvgDemo = () => {
  return (
    <MobilePhoneView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Svg height="50%" width="50%" viewBox="0 0 100 100">
        <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="blue"
          strokeWidth="2.5"
          fill="green"
        />
        <Rect
          x="15"
          y="15"
          width="70"
          height="70"
          stroke="red"
          strokeWidth="2"
          fill="yellow"
        />
      </Svg>
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
    <MobilePhoneView
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <ExpoImagePickerExample/>
    </MobilePhoneView>
  );
};
