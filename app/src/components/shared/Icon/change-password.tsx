import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const ChangePassword: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M6.75 9.75V7.5a3 3 0 016 0v2.25h1.5V7.5a4.501 4.501 0 00-9 0v2.25zM12 16.5h-1.5V15l9-9L21 7.5zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
    <Path
      d="M12.75 17.25h-3v-3l3.75-3.75h-9A1.505 1.505 0 003 12v7.5A1.505 1.505 0 004.5 21H15a1.505 1.505 0 001.5-1.5v-6zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
  </Svg>
);
