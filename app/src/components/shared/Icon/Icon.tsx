import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import { Backspace } from './backspace';
import { ChangePassword } from './change-password';
import { Close } from './close';
import { Clothing } from './clothing';
import { DeleteFilters } from './delete-filters';
import { DeleteProfile } from './delete-profile';
import { Dollar } from './dollar';
import { Download } from './download';
import { Entertainment } from './entertainment';
import { ErrorTriangle } from './error-triangle';
import { Eye } from './eye';
import { EyeOutlined } from './eye-outlined';
import { Hamburger } from './hamburger';
import { Home } from './home';
import { IdentityCard } from './identity-card';
import { Income } from './income';
import { Logout } from './logout';
import { OtherPurchase } from './other-purchase';
import { Plus } from './plus';
import { Profile } from './profile';
import { ProfileImage } from './profile-image';
import { Purchase } from './purchase';
import { SuccessTick } from './success-tick';
import { Trash } from './trash';
import { Visa } from './visa';
import { HamburgerBig } from './hamburger-big';
import { EntertainmentBig } from './entertainment-big';
import { ClothingBig } from './clothing-big';
import { OtherPurchaseBig } from './other-purchase-big';
import { Sun } from './sun';
import { Moon } from './moon';
import { Category } from './category';

export type IconType =
  | 'backspace'
  | 'category'
  | 'change-password'
  | 'close'
  | 'clothing'
  | 'clothing-big'
  | 'delete-filters'
  | 'delete-profile'
  | 'dollar'
  | 'download'
  | 'entertainment'
  | 'entertainment-big'
  | 'error-triangle'
  | 'eye'
  | 'eye-outlined'
  | 'hamburger'
  | 'hamburger-big'
  | 'home'
  | 'identity-card'
  | 'income'
  | 'logout'
  | 'moon'
  | 'other-purchase'
  | 'other-purchase-big'
  | 'plus'
  | 'profile'
  | 'profile-image'
  | 'purchase'
  | 'success-tick'
  | 'sun'
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
    case 'category':
      return <Category iconColor={iconColor} {...props} />;
    case 'change-password':
      return <ChangePassword iconColor={iconColor} {...props} />;
    case 'close':
      return <Close iconColor={iconColor} {...props} />;
    case 'clothing':
      return <Clothing iconColor={iconColor} {...props} />;
    case 'clothing-big':
      return <ClothingBig iconColor={iconColor} {...props} />;
    case 'delete-filters':
      return <DeleteFilters iconColor={iconColor} {...props} />;
    case 'delete-profile':
      return <DeleteProfile iconColor={iconColor} {...props} />;
    case 'dollar':
      return <Dollar iconColor={iconColor} {...props} />;
    case 'download':
      return <Download iconColor={iconColor} {...props} />;
    case 'entertainment':
      return <Entertainment iconColor={iconColor} {...props} />;
    case 'entertainment-big':
      return <EntertainmentBig iconColor={iconColor} {...props} />;
    case 'error-triangle':
      return <ErrorTriangle iconColor={iconColor} {...props} />;
    case 'eye':
      return <Eye iconColor={iconColor} {...props} />;
    case 'eye-outlined':
      return <EyeOutlined iconColor={iconColor} {...props} />;
    case 'hamburger':
      return <Hamburger iconColor={iconColor} {...props} />;
    case 'hamburger-big':
      return <HamburgerBig iconColor={iconColor} {...props} />;
    case 'home':
      return <Home iconColor={iconColor} {...props} />;
    case 'identity-card':
      return <IdentityCard iconColor={iconColor} {...props} />;
    case 'income':
      return <Income iconColor={iconColor} {...props} />;
    case 'logout':
      return <Logout iconColor={iconColor} {...props} />;
    case 'moon':
      return <Moon iconColor={iconColor} {...props} />;
    case 'other-purchase':
      return <OtherPurchase iconColor={iconColor} {...props} />;
    case 'other-purchase-big':
      return <OtherPurchaseBig iconColor={iconColor} {...props} />;
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
    case 'sun':
      return <Sun iconColor={iconColor} {...props} />;
    case 'trash':
      return <Trash iconColor={iconColor} {...props} />;
    case 'visa':
      return <Visa iconColor={iconColor} {...props} />;
    default:
      return;
  }
};
