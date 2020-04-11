import React, { useState } from 'react';
import { View } from 'react-native';
import { Camera } from 'expo-camera';
import Switch from 'expo-dark-mode-switch';
import * as Permissions from 'expo-permissions';
import MobilePhoneView from 'components/MobilePhoneView';
import AppButton from 'components/designSystem/AppButton';
import AppRevealView from 'components/designSystem/AppRevealView';

export const ExpoSwitchDemo = () => {
  const [value, setValue] = React.useState(true);
  return (
    <MobilePhoneView style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Switch value={value} onChange={value => setValue(value)} />
    </MobilePhoneView>
  );
};

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
