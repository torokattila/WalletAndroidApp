import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const IdentityCard: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M21.79 3.766H2.21A2.21 2.21 0 000 5.973v12.054a2.21 2.21 0 002.21 2.207h19.58A2.21 2.21 0 0024 18.027V5.973a2.21 2.21 0 00-2.21-2.207zm.827 14.261a.829.829 0 01-.828.828H2.211a.829.829 0 01-.828-.828V5.973c0-.457.37-.828.828-.828h19.578c.457 0 .828.37.828.828zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
    <Path
      d="M19.89 7.707h-6.347a.553.553 0 000 1.105h6.348c.304 0 .554-.25.554-.554 0-.305-.25-.551-.554-.551zm0 0M19.89 15.188h-6.347a.553.553 0 000 1.105h6.348a.553.553 0 100-1.105zm0 0M19.89 10.902h-3.84a.553.553 0 100 1.106h3.84a.553.553 0 100-1.105zm0 0M19.89 13.047h-3.84a.553.553 0 00-.554.55c0 .305.25.551.555.551h3.84a.553.553 0 00.554-.55c0-.305-.25-.551-.554-.551zm0 0M7.84 12.258a2.842 2.842 0 002.84-2.84 2.842 2.842 0 00-2.84-2.84A2.842 2.842 0 005 9.418a2.842 2.842 0 002.84 2.84zm0-4.301c.805 0 1.46.656 1.46 1.461s-.655 1.46-1.46 1.46a1.46 1.46 0 010-2.921zm0 0M8.941 12.77H6.758a2.772 2.772 0 00-2.77 2.77v1.19a.69.69 0 101.383 0v-1.19c0-.767.621-1.392 1.387-1.392H8.94a1.39 1.39 0 011.387 1.391v1.191a.69.69 0 101.383 0v-1.19a2.772 2.772 0 00-2.77-2.77zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
  </Svg>
);
