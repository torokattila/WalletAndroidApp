import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Eye: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" {...props}>
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M13 8.754A4.25 4.25 0 0 0 8.754 13 4.25 4.25 0 0 0 13 17.246 4.25 4.25 0 0 0 17.246 13 4.25 4.25 0 0 0 13 8.754Zm0 6.371A2.127 2.127 0 0 1 10.875 13c0-1.172.953-2.125 2.125-2.125 1.172 0 2.125.953 2.125 2.125A2.127 2.127 0 0 1 13 15.125Zm0 0"
    />
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M25.598 12.473c-.184-.325-4.641-7.97-12.598-7.97-7.957 0-12.414 7.645-12.598 7.97a1.052 1.052 0 0 0 0 1.05c.184.329 4.641 7.973 12.598 7.973 7.957 0 12.414-7.644 12.598-7.969a1.06 1.06 0 0 0 0-1.054ZM13 19.37c-5.602 0-9.32-4.758-10.418-6.375C3.676 11.386 7.379 6.63 13 6.63c5.602 0 9.32 4.758 10.418 6.375-1.094 1.61-4.793 6.367-10.418 6.367Zm0 0"
    />
  </Svg>
);
