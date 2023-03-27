import React, { FC } from 'react';
import { Text, View } from 'react-native';

type IncomeModalProps = {
  isVisible: boolean;
  onSave: () => Promise<void>;
  onClose: () => void;
};

export const IncomeModal: FC<IncomeModalProps> = ({ isVisible, onSave, onClose }) => (
  <View>
    <Text>Modal</Text>
  </View>
);
