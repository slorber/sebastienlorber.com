import React from 'react';
import { Button } from 'react-native-paper';
import { useAsyncCallback } from 'react-async-hook';

const AppButton = ({ onPress, children }) => {
  const asyncCallback = useAsyncCallback(onPress, {
    onError: e => console.error('useAsyncCallback error', e),
  });
  return (
    <Button
      onPress={asyncCallback.execute}
      loading={asyncCallback.status === 'loading'}
      mode="contained"
      style={{ alignSelf: 'center' }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
