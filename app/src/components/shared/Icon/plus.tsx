import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Plus: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={30} height={30} {...props}>
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M24.492 13.945h-8.437V5.508A1.06 1.06 0 0 0 15 4.453a1.06 1.06 0 0 0-1.055 1.055v8.437H5.508A1.06 1.06 0 0 0 4.453 15a1.06 1.06 0 0 0 1.055 1.055h8.437v8.437A1.06 1.06 0 0 0 15 25.547a1.06 1.06 0 0 0 1.055-1.055v-8.437h8.437A1.06 1.06 0 0 0 25.547 15a1.06 1.06 0 0 0-1.055-1.055Zm0 0"
    />
  </Svg>
);
