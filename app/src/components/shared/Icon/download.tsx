import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Download: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={19} height={19} viewBox="0 0 19 19" {...props}>
    <Path
      d="M18.457 9.281a.543.543 0 00-.547.543v4.953a2.44 2.44 0 01-2.437 2.438H3.527a2.44 2.44 0 01-2.437-2.438V9.742c0-.3-.242-.543-.547-.543-.3 0-.543.242-.543.543v5.035a3.533 3.533 0 003.527 3.528h11.946A3.533 3.533 0 0019 14.777V9.824a.544.544 0 00-.543-.543zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
    <Path
      d="M9.117 13.98a.55.55 0 00.383.165.533.533 0 00.383-.165l3.46-3.457a.547.547 0 000-.77.54.54 0 00-.769 0l-2.531 2.532V1.238a.542.542 0 10-1.086 0v11.047L6.422 9.754a.54.54 0 00-.77 0 .547.547 0 000 .77zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
  </Svg>
);
