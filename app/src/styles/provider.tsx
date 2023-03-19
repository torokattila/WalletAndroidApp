import React, { FC, PropsWithChildren } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { theme } from './theme';

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => (
  <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
);
