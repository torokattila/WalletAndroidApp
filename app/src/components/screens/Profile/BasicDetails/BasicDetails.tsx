/* eslint-disable curly */
import { FC } from 'react';
import { View } from 'react-native';

type BasicDetailsProps = {
  isVisible: boolean;
};

export const BasicDetails: FC<BasicDetailsProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return <View></View>;
};
