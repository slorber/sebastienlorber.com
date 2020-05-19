import { clamp } from 'lodash';
import { useDimensions } from '@react-native-community/hooks';

export const useBodyWidth = (width: number = 600) => {
  const { window } = useDimensions();
  return clamp(window.width, 0, width);
};
