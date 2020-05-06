import React, { useState, useEffect, useContext, ReactNode } from 'react';
import {
  useColorScheme,
  Appearance,
  ColorSchemeName,
} from 'react-native-appearance';

const useAppColorSchemeState = () => {
  const userColorScheme = useColorScheme();

  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    userColorScheme,
  );

  useEffect(() => {
    setColorScheme(userColorScheme);
  }, [userColorScheme]);

  console.debug('colorScheme = ' + colorScheme);

  return [colorScheme, setColorScheme] as const;
};

export type AppColorSchemeContextValue = ReturnType<
  typeof useAppColorSchemeState
>;

const AppColorSchemeContext = React.createContext<AppColorSchemeContextValue | null>(
  null,
);

export const useAppColorScheme = () => {
  const value = useContext(AppColorSchemeContext);
  if (!value) {
    throw new Error('AppColorSchemeProvider was not used!');
  }
  return value;
};

export const AppColorSchemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const value = useAppColorSchemeState();
  return (
    <AppColorSchemeContext.Provider value={value}>
      {children}
    </AppColorSchemeContext.Provider>
  );
};
