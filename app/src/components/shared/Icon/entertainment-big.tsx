import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const EntertainmentBig: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={60} height={60} viewBox="0 0 60 60" {...props}>
    <Path
      d="M55.715 50v-5.715H4.285V50H0v7.145h60V50zm0 0M25.715 22.855h8.57V40h-8.57zm0 0M44.285 22.855h8.57V40h-8.57zm0 0M7.145 22.855h8.57V40h-8.57zm0 0M30 2.855l-30 10v5.715h60v-5.715zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
  </Svg>
);
