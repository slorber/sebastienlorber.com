import React from 'react';
import { View, Platform, Image } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

// See https://github.com/vivaxy/react-native-auto-height-image/issues/60
const AppImage = ({
  source,
  width,
  maxWidth = '100%', // by default, do not overflow the parent!
}) => {
  // AutoHeightImage does not work on web, height stays at 0
  // Useful for mobile website!
  if (Platform.OS === 'web') {
    // return <Image source={source} style={{ width }} />;
    return <img src={source} style={{ width, maxWidth }} />;
  } else {
    // TODO how to avoid growing small images? how to apply maxWidth only?
    return <AutoHeightImage source={source} width={width} />;
  }
};

export default AppImage;
