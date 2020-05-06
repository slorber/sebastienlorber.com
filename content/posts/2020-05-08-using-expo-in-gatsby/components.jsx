import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { Camera } from 'expo-camera';
import ExpoDarkModeSwitch from 'expo-dark-mode-switch';
import * as Permissions from 'expo-permissions';
import MobilePhoneView from 'components/MobilePhoneView';
import AppButton from 'components/designSystem/AppButton';
import AppRevealView from 'components/designSystem/AppRevealView';
import ExpoGesturesExample from './ExpoGesturesExample';
import ExpoImagePickerExample from './ExpoImagePickerExample';
import { Video } from 'expo-av';
import { useColorMode } from 'theme/useColorMode';
import TigerSvg from './TigerSvg';

export const ExpoCameraDemo = () => {
  const [showCamera, setShowCamera] = useState(false);
  return (
    <MobilePhoneView safeAreaPaddingTop={0}>
      {showCamera ? (
        <AppRevealView
          // Workaround because onCameraReady fires at mount time in web (but camera does not display anything yet)
          delay={2500}
        >
          <Camera style={{ flex: 1, width: '100%' }} />
        </AppRevealView>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <AppButton
            onPress={async () => {
              try {
                const result = await Permissions.askAsync(Permissions.CAMERA);
                if (result.status === 'granted') {
                  setShowCamera(true);
                }
              } catch (e) {
                console.error(e);

                // TODO find a better workaround
                // Firefox will throw, we have to actually mount the camera so that FF ask the user permission...
                // See https://stackoverflow.com/a/53155894/82609
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
        onChange={(value) => setColorMode(value ? 'dark' : 'light')}
      />
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

// TODO report this annoying thing
const VideoSource =
  Platform.OS === 'web'
    ? { uri: require('./images/coverr-oil-rig-attraction-1567244954839.mp4') }
    : require('./images/coverr-oil-rig-attraction-1567244954839.mp4');

export const ExpoVideoDemo = () => {
  return (
    <MobilePhoneView
      safeAreaPaddingTop={0}
      style={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <Video
        source={VideoSource}
        rate={1.0}
        isMuted={true}
        resizeMode="cover"
        shouldPlay={true}
        isLooping={true}
        style={{ flex: 1, width: '100%' }}
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
