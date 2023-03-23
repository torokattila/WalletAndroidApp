import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Home: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M23.598 10.926 19.96 7.289V3.086a1.378 1.378 0 0 0-2.754 0v1.45L14.5 1.827c-1.34-1.34-3.668-1.336-5.004.004L.402 10.926a1.38 1.38 0 0 0 0 1.945c.54.54 1.41.54 1.946 0l9.093-9.094a.811.811 0 0 1 1.114-.004l9.097 9.098c.27.27.621.402.973.402s.703-.132.973-.402a1.38 1.38 0 0 0 0-1.945Zm0 0"
    />
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M12.477 6.387a.67.67 0 0 0-.954 0l-8 7.996c-.128.129-.199.3-.199.48v5.832c0 1.367 1.11 2.48 2.48 2.48h3.962V17.04h4.468v6.137h3.961a2.481 2.481 0 0 0 2.48-2.48v-5.833a.694.694 0 0 0-.198-.48Zm0 0"
    />
  </Svg>
);
