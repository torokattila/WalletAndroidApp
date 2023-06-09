import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Clothing: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      d="M22.86 16.016L12.933 9.8v-.469c0-.277.14-.5.445-.7l.133-.081c.48-.293 1.484-.91 1.484-2.293 0-1.442-1.187-2.547-2.332-2.781-1.207-.25-2.305.043-3.016.824-.652.715-.835 1.304-.875 2.27 0 .066-.003.218-.003.363-.004.203.394.367.89.367h.176c.492 0 .894-.164.894-.364 0-.167.004-.335.004-.367.028-.664.207-1.054.883-1.191.422-.086.875.031 1.145.293.12.117.183.324.164.535a.779.779 0 01-.336.586l-.852.578c-.539.348-.773.762-.773 1.39v1.04L1.14 15.992c-1.454.899-1.153 2.43-1.028 2.88.117.405.649 1.737 2.578 1.737h18.743c1.363 0 2.222-.882 2.476-1.765.258-.918-.023-2.223-1.05-2.828zm-1.008 2.16a.461.461 0 01-.45.344H2.668a.461.461 0 01-.453-.317c-.059-.187.015-.379.195-.504l9.602-6.012 9.656 6.036a.39.39 0 01.184.453zm0 0"
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
    />
  </Svg>
);
