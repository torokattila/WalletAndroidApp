import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Moon: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
    <Path
      d="M9 6c0 4.972 4.028 9 9 9 .91 0 1.788-.134 2.615-.385A9.004 9.004 0 0112 21c-4.972 0-9-4.028-9-9a9.004 9.004 0 016.385-8.615A8.982 8.982 0 009 6zm0 0"
      transform="scale(1.16667)"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={iconColor}
      strokeOpacity={1}
      strokeMiterlimit={4}
    />
  </Svg>
);
