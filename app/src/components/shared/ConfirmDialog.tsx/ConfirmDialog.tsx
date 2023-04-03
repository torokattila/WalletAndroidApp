import React, { FC } from 'react';
import { Modal } from 'react-native';
import { theme } from '@styles/theme';
import { Content, ContentContainer, Description, Title } from './ConfirmDialog.styles';

type ConfirmDialogProps = {
  isVisible: boolean;
  onPressPrimaryButton: () => void;
  title: string;
  description?: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  onPressSecondaryButton: () => void;
};

const shadow = {
  shadowColor: theme.colors.black,
  shadowOpacity: 0.2,
  shadowOffset: { width: 0, height: 8 },
  shadowRadius: 20,
  elevation: 20,
};

export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  isVisible,
  onPressPrimaryButton,
  title,
  description,
  primaryButtonText,
  secondaryButtonText,
  onPressSecondaryButton,
}) => (
  <Modal animationType="fade" transparent={true} visible={isVisible}>
    <ContentContainer>
      <Content style={shadow}>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
    </ContentContainer>
  </Modal>
);
