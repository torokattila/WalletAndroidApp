import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Close: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={32} height={32} viewBox="0 0 32 32" {...props}>
    <Path
      d="M17.414 16l4.262-4.262a1.007 1.007 0 000-1.414 1.007 1.007 0 00-1.414 0L16 14.586l-4.262-4.262a1.007 1.007 0 00-1.414 0 1.01 1.01 0 00-.293.707c0 .258.102.512.293.707L14.586 16l-4.262 4.262a1.01 1.01 0 00-.293.707c0 .258.102.511.293.707a1.007 1.007 0 001.414 0L16 17.414l4.262 4.262a1.007 1.007 0 001.414 0 1.007 1.007 0 000-1.414zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
  </Svg>
);
