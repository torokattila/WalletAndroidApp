import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Logout: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M17 17.25V14h-7v-4h7V6.75L22.25 12 17 17.25M13 2c1.102 0 2 .898 2 2v4h-2V4H4v16h9v-4h2v4c0 1.102-.898 2-2 2H4c-1.102 0-2-.898-2-2V4c0-1.102.898-2 2-2zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
  </Svg>
);
