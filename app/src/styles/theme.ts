import 'styled-components';
import { DefaultTheme } from 'styled-components';

type ColorRange = {
  100: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
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
    };
  }
}

export const theme: DefaultTheme = {
  colors: {
    grey: {
      100: '#9F9F9F',
      200: '#F1F0F3',
      300: '#696969',
      400: '#121212',
      500: '#1E1E1E',
      600: '#7c7c7c',
      700: '#252525',
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
    white: {
      100: '#fff',
      200: '#F9F9F9',
    },
    black: '#000',
  },
};
