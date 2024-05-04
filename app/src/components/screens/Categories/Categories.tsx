import { useDarkMode } from '@hooks/useDarkMode';
import React, { FC } from 'react';
import { Text, View } from 'react-native';

export const Categories: FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <View>
      <Text>Categories</Text>
    </View>
  );
};
