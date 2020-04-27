import { useCallback } from 'react';

import { useColorMode as useColorModeThemeUI } from 'theme-ui';
import { useColorMode as useColorModeRN } from './useColorMode.native';

export const useColorMode = () => {
  const [colorMode, setColorMode] = useColorModeThemeUI();
  const [_, setColorModeRN] = useColorModeRN();

  const setColorModeFixed = useCallback(
    colorMode => {
      setColorMode(colorMode);
      setColorModeRN(colorMode);
      // console.debug("setColorMode",colorMode);
    },
    [setColorMode],
  );

  return [colorMode, setColorModeFixed];
};
