import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import Pacifier from './pacifier';

export const PacifierSmall: FC<SvgProps & { iconColor: string }> = ({ iconColor, ...props }) => (
  <Pacifier width={24} height={24} iconColor={iconColor} {...props} />
);

export default PacifierSmall;
