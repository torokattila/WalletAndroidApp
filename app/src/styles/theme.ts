import 'styled-components';
import { DefaultTheme } from 'styled-components';

type ColorRange = {
  100: string;
  150?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  950?: string;
  1000?: string;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      grey: ColorRange;
      purple: ColorRange;
      green: ColorRange;
      red: string;
      white: ColorRange;
      black: string;
      magenta: ColorRange;
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    grey: {
      100: '#9F9F9F',
      150: '#58637E',
      200: '#F1F0F3',
      300: '#696969',
      400: '#121212',
      500: '#1E1E1E',
      600: '#7c7c7c',
      700: '#252525',
      800: '#0b1d41',
      900: '#18274A',
      950: '#2a4480',
      1000: '#0a1a38',
    },
    purple: {
      100: '#3F087A',
      200: '#3f087a57',
      300: '#8E65F7',
      400: '#8E65F757',
    },
    green: {
      100: '#A3DA57',
      200: '#92C34E',
      300: '#2FAC56',
      400: '#4fce6e',
    },
    red: '#E23D3D',
    magenta: {
      100: '#e84393',
    },
    white: {
      100: '#fff',
      200: '#F9F9F9',
    },
    black: '#000',
  },
};
