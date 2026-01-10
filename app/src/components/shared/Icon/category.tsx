import React, { FC } from 'react';
import Svg, { G, Path } from 'react-native-svg';

export const Category: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg fill={iconColor} height={28} viewBox="0 0 24 24" width={28} {...props}>
    <G
      stroke={iconColor}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
    >
      <Path d="M5 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3H5C3 2 2 3 2 5v2c0 2 1 3 3 3zM17 10h2c2 0 3-1 3-3V5c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3zM17 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3h-2c-2 0-3 1-3 3v2c0 2 1 3 3 3zM5 22h2c2 0 3-1 3-3v-2c0-2-1-3-3-3H5c-2 0-3 1-3 3v2c0 2 1 3 3 3z" />
    </G>
  </Svg>
);
