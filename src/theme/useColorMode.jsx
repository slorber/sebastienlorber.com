import { useCallback, useEffect } from 'react';

import { useColorMode as useColorModeThemeUI } from 'theme-ui';
import { useColorMode as useColorModeRN } from './useColorMode.native';

const colorModes = ['light', 'dark'];
const defaultColorMode = 'dark';

export const useColorMode = () => {
  const [colorMode, setColorMode] = useColorModeThemeUI();
  const [_, setColorModeRN] = useColorModeRN();

  const setColorModeFixed = useCallback(
    (colorMode) => {
      setColorMode(colorMode);
      setColorModeRN(colorMode);
      // console.debug("setColorMode",colorMode);
    },
    [setColorMode],
  );

  const colorModeFixed = colorModes.includes(colorMode)
    ? colorMode
    : defaultColorMode;

  return [colorModeFixed, setColorModeFixed];
};
