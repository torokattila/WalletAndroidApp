import React, { FC } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export interface VibrationOffProps extends SvgProps {
  iconColor?: string;
}

export const VibrationOff: FC<VibrationOffProps> = ({ iconColor = '#000000', ...props }) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    stroke={iconColor}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="m2 8 2 2 -2 2 2 2 -2 2" strokeWidth={2} />
    <Path d="m22 8 -2 2 2 2 -2 2 2 2" strokeWidth={2} />
    <Path d="M8 8v10c0 0.55 0.45 1 1 1h6c0.55 0 1 -0.45 1 -1v-2" strokeWidth={2} />
    <Path d="M16 10.34V6c0 -0.55 -0.45 -1 -1 -1h-4.34" strokeWidth={2} />
    <Path d="m2 2 20 20" strokeWidth={2} />
  </Svg>
);
