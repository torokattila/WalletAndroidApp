import React, { FC } from 'react';
import { Modal } from 'react-native';
import GestureRecognizer from 'react-native-swipe-detect';
import { theme } from '@styles/theme';
import { ModalBackground } from '@components/shared';
import { ContentContainer, UpperLine } from './IncomeModal.styles';

type IncomeModalProps = {
  isVisible: boolean;
  onSave: () => void;
  onClose: () => void;
};

const shadow = {
  elevation: 8,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -8, height: 20 },
  shadowOpacity: 0.6,
  shadowRadius: 35,
};

export const IncomeModal: FC<IncomeModalProps> = ({ isVisible, onClose }) => {
  // eslint-disable-next-line curly
  if (!isVisible) return null;

  return (
    <GestureRecognizer onSwipeDown={onClose}>
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={onClose}
        animated
      >
        <ModalBackground onHide={onClose} isVisible={isVisible} />
        <ContentContainer style={shadow}>
          <UpperLine />
        </ContentContainer>
      </Modal>
    </GestureRecognizer>
  );
};
