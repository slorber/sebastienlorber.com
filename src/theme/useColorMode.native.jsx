import React, { useState, useEffect } from 'react';
import { useAppColorScheme } from '../../AppColorSchemeContext';

const colorModes = ['light', 'dark'];
const defaultColorMode = 'dark';

export const useColorMode = () => {
  const [colorScheme,setColorScheme] = useAppColorScheme();

  const colorModeFixed = colorModes.includes(colorScheme)
    ? colorScheme
    : defaultColorMode;

  return [colorModeFixed, setColorScheme];
};
