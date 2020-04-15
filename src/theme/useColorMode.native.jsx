import React, { useState, useEffect } from 'react';
import { useColorScheme } from 'react-native-appearance';

export const useColorMode = () => {
  const userColorScheme = useColorScheme();

  const [colorMode, setColorMode] = useState(userColorScheme);

  useEffect(() => {
    setColorMode(userColorScheme);
  }, [userColorScheme]);

  return [colorMode, setColorMode];
};
