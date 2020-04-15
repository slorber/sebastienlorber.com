import React from 'react';
import { View } from 'react-native';

const MobilePhoneView = ({
  safeAreaPaddingTop = 25, // TODO use rn-safearea instead?
  width = 280,
  height = 535,
  style,
  children,
  userSelect = 'none',
}) => (
  <View style={{ marginVertical: 20, alignItems: 'center' }}>
    <View
      style={{
        position: 'relative',
        backgroundColor: '#000000',
        borderWidth: 3,
        borderColor: 'grey',
        width: width,
        height: height,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        userSelect,
      }}
    >
      <View
        style={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          width: width - 15,
          height: height - 15,
          borderRadius: 18,
        }}
      >
        <View
          style={[
            {
              width: '100%',
              height: '100%',
              paddingTop: safeAreaPaddingTop,
            },
            style,
          ]}
        >
          {children}
        </View>
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
