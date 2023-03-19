import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Close: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={28} height={28} {...props}>
    <Svg width={28} height={28} {...props}>
      <Path
        stroke="none"
        fillRule="nonzero"
        fill={iconColor}
        fillOpacity={1}
        d="m18.11 14.16 9.406-9.41a2.783 2.783 0 0 0-.004-3.938 2.784 2.784 0 0 0-3.942.004l-9.41 9.403L4.762.816A2.788 2.788 0 0 0 .812 4.75l9.415 9.41-9.415 9.414a2.788 2.788 0 0 0 3.95 3.934l9.398-9.406 9.41 9.406a2.788 2.788 0 0 0 3.942.004 2.783 2.783 0 0 0 .004-3.938Zm0 0"
      />
    </Svg>
  </Svg>
);
