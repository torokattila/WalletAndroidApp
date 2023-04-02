import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';

export const Income: FC<{ iconColor: string }> = ({ iconColor, ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" {...props}>
    <Path
      stroke="none"
      fillRule="nonzero"
      fill={iconColor}
      fillOpacity={1}
      d="M16.684 6.48c0 .25-.239.454-.536.454H7.945c-.293 0-.53-.204-.53-.454s.237-.453.53-.453h8.203c.297 0 .536.203.536.453Zm-.926-.714-7.5.02c-.367 0-1.922-1.77-1.922-3.13 0-1.636 1.402-1.496 2.48-1.508.922-.007 1.883-1.293 2.582-.796.973.703 1.2 2.351 1.45 2.351.43 0-.012-2.148 2.129-2.148 2.132 0 2.984.484 2.703 2.015-.301 1.621-1.575 3.153-1.922 3.196Zm.84 1.96h-9.02c-2.926 1.786-5.41 5.262-5.41 9.84 0 5.043 4.644 6.196 9.945 6.196 5.305 0 9.719-1.207 9.719-6.258 0-4.238-2.148-7.902-5.234-9.777Zm-3.985 12.286-.191.031v1.55h-1.098v-1.468l-.23-.004c-.989-.043-2.024-.262-2.711-.566l.402-1.39c.582.257 1.535.577 2.649.577h.101c1.184 0 1.922-.453 1.922-1.176 0-.789-.809-1.191-2.02-1.554-2.097-.625-2.988-1.414-2.988-2.645 0-1.297 1.031-2.254 2.766-2.555l.191-.035V9.344h1.098v1.36l.223.01c.851.032 1.57.169 2.187.419l-.351 1.273a6.162 6.162 0 0 0-2.168-.379h-.133c-1.57 0-1.692.828-1.692 1.078 0 .665.707 1.028 2.188 1.536 1.902.617 2.68 1.398 2.68 2.703 0 1.375-1.083 2.394-2.825 2.668Zm0 0"
    />
  </Svg>
);