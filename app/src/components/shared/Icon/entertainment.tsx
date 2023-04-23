import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Entertainment: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M2.555 17.691a.883.883 0 00-.887.883c0 .488.395.887.887.887h18.89a.886.886 0 00.887-.887.883.883 0 00-.887-.883h-1.949v-7.253h1.95c.39 0 .734-.254.847-.63a.884.884 0 00-.352-.992l-9.445-6.37a.884.884 0 00-.992 0l-9.445 6.37a.884.884 0 00-.352.993.884.884 0 00.848.629h1.949v7.253zm10.761-7.253v7.253h-2.632v-7.253zm4.407 7.253H15.09v-7.253h2.633zM12 4.246l6.55 4.422H5.45zm-5.723 6.191H8.91v7.254H6.277zm0 0M23.41 20.527H.59a.59.59 0 100 1.18h22.82a.59.59 0 100-1.18zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
  </Svg>
);
