/* eslint-disable curly */
import { FC } from 'react';
import { View } from 'react-native';

type ChangePasswordProps = {
  isVisible: boolean;
};

export const ChangePassword: FC<ChangePasswordProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return <View></View>;
};
