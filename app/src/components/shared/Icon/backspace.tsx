import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Backspace: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={25} height={25} viewBox="0 0 25 25" {...props}>
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M23.957 3.125H6.5c-.352 0-.68.176-.875.473L.172 11.93c-.23.347-.23.793 0 1.14l5.453 8.332c.195.297.523.473.875.473h17.457A1.04 1.04 0 0 0 25 20.832V4.168a1.04 1.04 0 0 0-1.043-1.043Zm-4.469 14.277a1.044 1.044 0 0 1-1.476 0l-3.43-3.43-3.43 3.43a1.035 1.035 0 0 1-.734.305 1.042 1.042 0 0 1-.738-1.777l3.43-3.43-3.43-3.43a1.042 1.042 0 0 1 1.472-1.472l3.43 3.43 3.43-3.43a1.042 1.042 0 1 1 1.477 1.473L16.054 12.5l3.433 3.43a1.042 1.042 0 0 1 0 1.472Zm0 0"
    />
  </Svg>
);
