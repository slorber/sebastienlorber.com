import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native-appearance';

export const useColorMode = () => {
  const userColorScheme = useColorScheme();

  const [colorMode, setColorMode] = useState(userColorScheme);

  useEffect(() => {
    setColorMode(userColorScheme);
  }, [userColorScheme]);

  // console.debug("color mode native = " + colorMode);

  return [colorMode, setColorMode];
};
