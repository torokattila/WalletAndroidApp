import React, { FC } from 'react';
import { SvgProps } from 'react-native-svg';
import Airplane from './airplane';
import AirplaneSmall from './airplane-small';
import Apple from './apple';
import AppleSmall from './apple-small';
import { Backspace } from './backspace';
import Beauty from './beauty';
import BeautySmall from './beauty-small';
import BookShelf from './book-shelf';
import BookShelfSmall from './book-shelf-small';
import { Calendar } from './calendar';
import Car from './car';
import CarSmall from './car-small';
import { Category } from './category';
import { ChangePassword } from './change-password';
import { Close } from './close';
import { Clothing } from './clothing';
import { ClothingBig } from './clothing-big';
import { DeleteFilters } from './delete-filters';
import { DeleteProfile } from './delete-profile';
import Dog from './dog';
import DogSmall from './dog-small';
import { Dollar } from './dollar';
import { Download } from './download';
import { Entertainment } from './entertainment';
import { EntertainmentBig } from './entertainment-big';
import { ErrorTriangle } from './error-triangle';
import { Eye } from './eye';
import { EyeOutlined } from './eye-outlined';
import Gaming from './gaming';
import GamingSmall from './gaming-small';
import GasStation from './gas-station';
import GasStationSmall from './gas-station-small';
import Guitar from './guitar';
import GuitarSmall from './guitar-small';
import Hairdresser from './hairdresser';
import HairdresserSmall from './hairdresser-small';
import { Hamburger } from './hamburger';
import { HamburgerBig } from './hamburger-big';
import { Home } from './home';
import House from './house';
import HouseSmall from './house-small';
import { IdentityCard } from './identity-card';
import { Income } from './income';
import { Logout } from './logout';
import Microphone from './microphone';
import MicrophoneSmall from './microphone-small';
import Mobile from './mobile';
import MobileSmall from './mobile-small';
import { Moon } from './moon';
import NoSmoking from './no-smoking';
import NoSmokingSmall from './no-smoking-small';
import { OtherPurchase } from './other-purchase';
import { OtherPurchaseBig } from './other-purchase-big';
import Pills from './pills';
import PillsSmall from './pills-small';
import { Plus } from './plus';
import Present from './present';
import PresentSmall from './present-small';
import { Profile } from './profile';
import { ProfileImage } from './profile-image';
import { Purchase } from './purchase';
import Restaurant from './restaurant';
import RestaurantSmall from './restaurant-small';
import ShoppingCart from './shopping-cart';
import ShoppingCartSmall from './shopping-cart-small';
import { SuccessTick } from './success-tick';
import { Sun } from './sun';
import Train from './train';
import TrainSmall from './train-small';
import { Trash } from './trash';
import { Visa } from './visa';
import Shirt from './shirt';
import ShirtSmall from './shirt-small';
import WineGlasses from './wine-glasses';
import WineGlassesSmall from './wine-glasses-small';

export type IconType =
  | 'airplane'
  | 'airplane-small'
  | 'apple'
  | 'apple-small'
  | 'backspace'
  | 'beauty'
  | 'beauty-small'
  | 'book-shelf'
  | 'book-shelf-small'
  | 'calendar'
  | 'car'
  | 'car-small'
  | 'category'
  | 'change-password'
  | 'close'
  | 'clothing'
  | 'clothing-big'
  | 'delete-filters'
  | 'delete-profile'
  | 'dog'
  | 'dog-small'
  | 'dollar'
  | 'download'
  | 'entertainment'
  | 'entertainment-big'
  | 'error-triangle'
  | 'eye'
  | 'eye-outlined'
  | 'gas-station'
  | 'gas-station-small'
  | 'gaming'
  | 'gaming-small'
  | 'guitar'
  | 'guitar-small'
  | 'hairdresser'
  | 'hairdresser-small'
  | 'hamburger'
  | 'hamburger-big'
  | 'home'
  | 'house'
  | 'house-small'
  | 'identity-card'
  | 'income'
  | 'logout'
  | 'microphone'
  | 'microphone-small'
  | 'mobile'
  | 'mobile-small'
  | 'moon'
  | 'no-smoking'
  | 'no-smoking-small'
  | 'other-purchase'
  | 'other-purchase-big'
  | 'pills'
  | 'pills-small'
  | 'present'
  | 'present-small'
  | 'plus'
  | 'profile'
  | 'profile-image'
  | 'purchase'
  | 'restaurant'
  | 'restaurant-small'
  | 'shirt'
  | 'shirt-small'
  | 'shopping-cart'
  | 'shopping-cart-small'
  | 'success-tick'
  | 'sun'
  | 'train'
  | 'train-small'
  | 'trash'
  | 'visa'
  | 'wine-glasses'
  | 'wine-glasses-small';

type IconProps = SvgProps & {
  type: IconType;
  iconColor?: string;
};

export const Icon: FC<IconProps> = ({ type, iconColor = '#000', ...props }) => {
  switch (type) {
    case 'airplane':
      return <Airplane iconColor={iconColor} {...props} />;
    case 'airplane-small':
      return <AirplaneSmall iconColor={iconColor} {...props} />;
    case 'apple':
      return <Apple iconColor={iconColor} {...props} />;
    case 'apple-small':
      return <AppleSmall iconColor={iconColor} {...props} />;
    case 'backspace':
      return <Backspace iconColor={iconColor} {...props} />;
    case 'beauty':
      return <Beauty iconColor={iconColor} {...props} />;
    case 'beauty-small':
      return <BeautySmall iconColor={iconColor} {...props} />;
    case 'book-shelf':
      return <BookShelf iconColor={iconColor} {...props} />;
    case 'book-shelf-small':
      return <BookShelfSmall iconColor={iconColor} {...props} />;
    case 'calendar':
      return <Calendar iconColor={iconColor} {...props} />;
    case 'car':
      return <Car iconColor={iconColor} {...props} />;
    case 'car-small':
      return <CarSmall iconColor={iconColor} {...props} />;
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
    case 'dog':
      return <Dog iconColor={iconColor} {...props} />;
    case 'dog-small':
      return <DogSmall iconColor={iconColor} {...props} />;
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
    case 'gas-station':
      return <GasStation iconColor={iconColor} {...props} />;
    case 'gas-station-small':
      return <GasStationSmall iconColor={iconColor} {...props} />;
    case 'gaming':
      return <Gaming iconColor={iconColor} {...props} />;
    case 'gaming-small':
      return <GamingSmall iconColor={iconColor} {...props} />;
    case 'guitar':
      return <Guitar iconColor={iconColor} {...props} />;
    case 'guitar-small':
      return <GuitarSmall iconColor={iconColor} {...props} />;
    case 'hairdresser':
      return <Hairdresser iconColor={iconColor} {...props} />;
    case 'hairdresser-small':
      return <HairdresserSmall iconColor={iconColor} {...props} />;
    case 'hamburger':
      return <Hamburger iconColor={iconColor} {...props} />;
    case 'hamburger-big':
      return <HamburgerBig iconColor={iconColor} {...props} />;
    case 'house':
      return <House iconColor={iconColor} {...props} />;
    case 'house-small':
      return <HouseSmall iconColor={iconColor} {...props} />;
    case 'home':
      return <Home iconColor={iconColor} {...props} />;
    case 'identity-card':
      return <IdentityCard iconColor={iconColor} {...props} />;
    case 'income':
      return <Income iconColor={iconColor} {...props} />;
    case 'mobile':
      return <Mobile iconColor={iconColor} {...props} />;
    case 'mobile-small':
      return <MobileSmall iconColor={iconColor} {...props} />;
    case 'logout':
      return <Logout iconColor={iconColor} {...props} />;
    case 'microphone':
      return <Microphone iconColor={iconColor} {...props} />;
    case 'microphone-small':
      return <MicrophoneSmall iconColor={iconColor} {...props} />;
    case 'moon':
      return <Moon iconColor={iconColor} {...props} />;
    case 'no-smoking':
      return <NoSmoking iconColor={iconColor} {...props} />;
    case 'no-smoking-small':
      return <NoSmokingSmall iconColor={iconColor} {...props} />;
    case 'other-purchase':
      return <OtherPurchase iconColor={iconColor} {...props} />;
    case 'other-purchase-big':
      return <OtherPurchaseBig iconColor={iconColor} {...props} />;
    case 'pills':
      return <Pills iconColor={iconColor} {...props} />;
    case 'pills-small':
      return <PillsSmall iconColor={iconColor} {...props} />;
    case 'present':
      return <Present iconColor={iconColor} {...props} />;
    case 'present-small':
      return <PresentSmall iconColor={iconColor} {...props} />;
    case 'plus':
      return <Plus iconColor={iconColor} {...props} />;
    case 'profile':
      return <Profile iconColor={iconColor} {...props} />;
    case 'profile-image':
      return <ProfileImage iconColor={iconColor} {...props} />;
    case 'purchase':
      return <Purchase iconColor={iconColor} {...props} />;
    case 'shirt':
      return <Shirt iconColor={iconColor} {...props} />;
    case 'shirt-small':
      return <ShirtSmall iconColor={iconColor} {...props} />;
    case 'restaurant':
      return <Restaurant iconColor={iconColor} {...props} />;
    case 'restaurant-small':
      return <RestaurantSmall iconColor={iconColor} {...props} />;
    case 'shopping-cart':
      return <ShoppingCart iconColor={iconColor} {...props} />;
    case 'shopping-cart-small':
      return <ShoppingCartSmall iconColor={iconColor} {...props} />;
    case 'success-tick':
      return <SuccessTick iconColor={iconColor} {...props} />;
    case 'sun':
      return <Sun iconColor={iconColor} {...props} />;
    case 'train':
      return <Train iconColor={iconColor} {...props} />;
    case 'train-small':
      return <TrainSmall iconColor={iconColor} {...props} />;
    case 'trash':
      return <Trash iconColor={iconColor} {...props} />;
    case 'visa':
      return <Visa iconColor={iconColor} {...props} />;
    case 'wine-glasses':
      return <WineGlasses iconColor={iconColor} {...props} />;
    case 'wine-glasses-small':
      return <WineGlassesSmall iconColor={iconColor} {...props} />;
    default:
      return;
  }
};
