import React, { useState, useEffect } from 'react';
import { useAppColorScheme } from '../../AppColorSchemeContext';

export const useColorMode = () => {
  const [colorScheme,setColorScheme] = useAppColorScheme();

  // TODO handle the non light/dark values better here
  return [colorScheme, setColorScheme];
};
