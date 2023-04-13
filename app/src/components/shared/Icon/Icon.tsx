import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import { Backspace } from './backspace';
import { Close } from './close';
import { DeleteFilters } from './delete-filters';
import { Dollar } from './dollar';
import { Download } from './download';
import { ErrorTriangle } from './error-triangle';
import { Eye } from './eye';
import { EyeOutlined } from './eye-outlined';
import { Home } from './home';
import { Income } from './income';
import { Plus } from './plus';
import { Profile } from './profile';
import { ProfileImage } from './profile-image';
import { Purchase } from './purchase';
import { SuccessTick } from './success-tick';
import { Trash } from './trash';
import { Visa } from './visa';

export type IconType =
  | 'backspace'
  | 'close'
  | 'delete-filters'
  | 'dollar'
  | 'download'
  | 'error-triangle'
  | 'eye'
  | 'eye-outlined'
  | 'income'
  | 'home'
  | 'plus'
  | 'profile'
  | 'profile-image'
  | 'purchase'
  | 'success-tick'
  | 'trash'
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
    case 'delete-filters':
      return <DeleteFilters iconColor={iconColor} {...props} />;
    case 'dollar':
      return <Dollar iconColor={iconColor} {...props} />;
    case 'download':
      return <Download iconColor={iconColor} {...props} />;
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
    case 'profile-image':
      return <ProfileImage iconColor={iconColor} {...props} />;
    case 'purchase':
      return <Purchase iconColor={iconColor} {...props} />;
    case 'success-tick':
      return <SuccessTick iconColor={iconColor} {...props} />;
    case 'trash':
      return <Trash iconColor={iconColor} {...props} />;
    case 'visa':
      return <Visa iconColor={iconColor} {...props} />;
    default:
      return;
  }
};
