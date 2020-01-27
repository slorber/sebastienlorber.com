import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { useAnimation } from 'react-native-animation-hooks';
import { ActivityIndicator } from 'react-native-paper';
import { delayPromise } from 'utils/promiseUtils';

const AppSpinnerView = ({ style }) => (
  <View
    style={[
      {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
      },
      style,
    ]}
  >
    <ActivityIndicator size="large" />
  </View>
);

const AppRevealView = ({
  children,
  placeholder = <AppSpinnerView />,
  delay = 0,
}) => {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    let unmounted = false;

    const asyncOnMount = async () => {
      await delayPromise(delay);
      !unmounted && setReveal(true);
    };

    asyncOnMount().catch(console.error);

    return () => {
      unmounted = true;
    };
  }, []);

  const placeholderOpacity = useAnimation({
    type: 'timing',
    duration: 500,
    toValue: reveal ? 0 : 1,
    useNativeDriver: true,
  });

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <View style={{ flex: 1 }}>{children}</View>
      <Animated.View
        style={[StyleSheet.absoluteFill, { opacity: placeholderOpacity }]}
        pointerEvents={reveal ? 'none' : 'auto'}
      >
        {placeholder}
      </Animated.View>
    </View>
  );
};

export default AppRevealView;
