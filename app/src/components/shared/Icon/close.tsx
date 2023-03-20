import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Close: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="m22.438 20.7-8.7-8.7 8.7-8.7a1.235 1.235 0 0 0 0-1.737 1.225 1.225 0 0 0-1.739 0L12 10.261l-8.7-8.7a1.235 1.235 0 0 0-1.737 0 1.225 1.225 0 0 0 0 1.739L10.261 12l-8.7 8.7a1.235 1.235 0 0 0 0 1.738c.485.484 1.262.48 1.739 0l8.699-8.7 8.7 8.7c.472.472 1.257.48 1.738 0 .484-.481.48-1.258 0-1.739Zm0 0"
    />
  </Svg>
);
