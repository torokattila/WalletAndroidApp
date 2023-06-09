import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const SuccessTick: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={28} height={28} viewBox="0 0 28 28" {...props}>
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M13.406 19.45h-.043c-.422-.012-.82-.2-1.101-.512l-4-4.477a1.538 1.538 0 0 1 .12-2.172 1.534 1.534 0 0 1 2.169.121l2.918 3.266 9.633-9.633a1.537 1.537 0 0 1 2.175 2.172L14.492 19c-.289.29-.68.45-1.086.45Zm0 0"
    />
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M13.984 27.816C6.36 27.816.152 21.61.152 13.984.152 6.36 6.36.152 13.984.152c2.532 0 5.004.692 7.16 1.996a1.537 1.537 0 0 1-1.593 2.63 10.718 10.718 0 0 0-5.567-1.551c-5.93 0-10.757 4.828-10.757 10.757 0 5.93 4.828 10.758 10.757 10.758 5.93 0 10.758-4.828 10.758-10.758 0-.457-.031-.918-.086-1.37-.11-.84.489-1.61 1.332-1.72.84-.105 1.61.493 1.715 1.333.074.582.113 1.171.113 1.757 0 7.625-6.207 13.832-13.832 13.832Zm0 0"
    />
  </Svg>
);
