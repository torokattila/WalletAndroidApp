import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const EyeOutlined: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={26} height={26} viewBox="0 0 26 26" {...props}>
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M5.102 3.563a1.094 1.094 0 0 0-1.54 0 1.094 1.094 0 0 0 0 1.539l6.102 6.101a3.79 3.79 0 0 0 5.133 5.133l6.101 6.102c.204.203.48.32.77.32.289 0 .562-.117.77-.32.203-.208.32-.481.32-.77 0-.29-.117-.566-.32-.77ZM13 14.624A1.624 1.624 0 0 1 11.375 13v-.074l1.691 1.687Zm0 0"
    />
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M13.238 18.418c-4.66.105-7.715-3.89-8.668-5.418A14.783 14.783 0 0 1 7 10.055L5.418 8.527a17.177 17.177 0 0 0-3.11 3.93 1.08 1.08 0 0 0 0 1.086c.68 1.18 4.333 7.039 10.715 7.039h.27a10.35 10.35 0 0 0 3.5-.723l-1.715-1.714c-.601.16-1.219.25-1.84.273ZM23.691 12.457C23 11.254 19.176 5.223 12.707 5.418a10.35 10.35 0 0 0-3.5.723l1.715 1.714a8.377 8.377 0 0 1 1.84-.273c4.648-.117 7.703 3.89 8.668 5.418a14.811 14.811 0 0 1-2.48 2.945l1.632 1.528a17.192 17.192 0 0 0 3.152-3.93 1.08 1.08 0 0 0-.043-1.086Zm0 0"
    />
  </Svg>
);
