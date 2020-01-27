import React, { useState } from 'react';
import { View } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import MobilePhoneView from 'components/MobilePhoneView';
import AppButton from 'components/designSystem/AppButton';
import AppRevealView from 'components/designSystem/AppRevealView';

export const ExpoCameraDemo = () => {
  const [showCamera, setShowCamera] = useState(false);
  return (
    <MobilePhoneView>
      {showCamera ? (
        <AppRevealView delay={2000}>
          <Camera />
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
