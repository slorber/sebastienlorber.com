import React from 'react';
import { View } from 'react-native';

const MobilePhoneView = ({ children }) => (
  <View style={{ alignItems: 'center' }}>
    <View
      style={{
        position: 'relative',
        backgroundColor: '#000000',
        borderWidth: 3,
        borderColor: 'grey',
        width: 280,
        height: 535,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          width: 265,
          height: 520,
          borderRadius: 18,
        }}
      >
        <View style={{ width: '100%', height: '100%' }}>{children}</View>
        <View
          style={{
            position: 'absolute',
            width: '60%',
            top: 0,
            left: '20%',
            height: 25,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            backgroundColor: '#000000',
          }}
        />
      </View>
    </View>
  </View>
);

export default MobilePhoneView;
