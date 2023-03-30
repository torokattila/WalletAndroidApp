import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import { Backspace } from './backspace';
import { Close } from './close';
import { ErrorTriangle } from './error-triangle';
import { Eye } from './eye';
import { EyeOutlined } from './eye-outlined';
import { Home } from './home';
import { Income } from './income';
import { Plus } from './plus';
import { Profile } from './profile';
import { Purchase } from './purchase';
import { SuccessTick } from './success-tick';
import { Visa } from './visa';

export type IconType =
  | 'backspace'
  | 'close'
  | 'error-triangle'
  | 'eye'
  | 'eye-outlined'
  | 'income'
  | 'home'
  | 'plus'
  | 'profile'
  | 'purchase'
  | 'success-tick'
  | 'visa';

type IconProps = SvgProps & {
  type: IconType;
  iconColor?: string;
};

export const Icon: FC<IconProps> = ({ type, iconColor = '#000', ...props }) => {
  switch (type) {
    case 'backspace':
      return <Backspace iconColor={iconColor} {...props} />;
    case 'close':
      return <Close iconColor={iconColor} {...props} />;
    case 'error-triangle':
      return <ErrorTriangle iconColor={iconColor} {...props} />;
    case 'eye':
      return <Eye iconColor={iconColor} {...props} />;
    case 'eye-outlined':
      return <EyeOutlined iconColor={iconColor} {...props} />;
    case 'income':
      return <Income iconColor={iconColor} {...props} />;
    case 'home':
      return <Home iconColor={iconColor} {...props} />;
    case 'plus':
      return <Plus iconColor={iconColor} {...props} />;
    case 'profile':
      return <Profile iconColor={iconColor} {...props} />;
    case 'purchase':
      return <Purchase iconColor={iconColor} {...props} />;
    case 'success-tick':
      return <SuccessTick iconColor={iconColor} {...props} />;
    case 'visa':
      return <Visa iconColor={iconColor} {...props} />;
    default:
      return;
  }
};
