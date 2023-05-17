import React, { FC } from 'react';
import { Modal } from 'react-native';
import { theme } from '@styles/theme';
import { useDarkMode } from '@hooks/useDarkMode';
import {
  Background,
  Content,
  ContentContainer,
  Description,
  PrimaryButton,
  PrimaryButtonText,
  SecondaryButton,
  SecondaryButtonText,
  Title,
} from './ConfirmDialog.styles';

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
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <Background>
        <ContentContainer>
          <Content style={shadow} isDarkMode={isDarkMode}>
            <Title>{title}</Title>
            <Description>{description}</Description>

            <PrimaryButton onPress={onPressPrimaryButton}>
              <PrimaryButtonText>{primaryButtonText}</PrimaryButtonText>
            </PrimaryButton>

            <SecondaryButton onPress={onPressSecondaryButton} isDarkMode={isDarkMode}>
              <SecondaryButtonText isDarkMode={isDarkMode}>
                {secondaryButtonText}
              </SecondaryButtonText>
            </SecondaryButton>
          </Content>
        </ContentContainer>
      </Background>
    </Modal>
  );
};
