import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const DeleteFilters: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" {...props}>
    <Path
      d="M18.75 7.133l-.883-.883L15 9.117 12.133 6.25l-.883.883L14.117 10l-2.867 2.867.883.883L15 10.883l2.867 2.867.883-.883L15.883 10zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
    <Path
      d="M2.5 2.5c-.691 0-1.25.559-1.25 1.25v1.98c0 .332.133.653.367.887L6.25 11.25v5c0 .691.559 1.25 1.25 1.25H10c.691 0 1.25-.559 1.25-1.25V15H10v1.25H7.5v-5.52l-.367-.363L2.5 5.73V3.75H15V5h1.25V3.75c0-.691-.559-1.25-1.25-1.25zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
  </Svg>
);
