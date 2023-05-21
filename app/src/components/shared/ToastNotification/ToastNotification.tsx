import React, { FC, useEffect } from 'react';
import Toast from 'react-native-root-toast';
import { TouchableWithoutFeedback, View } from 'react-native';
import { theme } from '@styles/theme';
import { Icon } from '../Icon';
import {
  Container,
  StyledText,
  SubtitleContainer,
  TextContainer,
  toastContainerStyle,
} from './ToastNotification.styles';

type ToastNotificationProps = {
  isVisible: boolean;
  title: string;
  subtitle: string;
  type: 'success' | 'error' | 'warning';
  onHideToast: () => void;
};

const backgroundColor = {
  success: theme.colors.green[300],
  error: theme.colors.red,
};

const icon = {
  success: <Icon type="success-tick" iconColor={theme.colors.white[100]} />,
  error: <Icon type="error-triangle" iconColor={theme.colors.white[100]} />,
};

export const ToastNotification: FC<ToastNotificationProps> = ({
  isVisible,
  title,
  subtitle,
  type,
  onHideToast,
}) => {
  useEffect(() => {
    if (isVisible) {
      const hideToast = setTimeout(() => {
        onHideToast();
      }, 3000);

      return () => {
        clearTimeout(hideToast);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  // eslint-disable-next-line curly
  if (!isVisible) return null;

  return (
    <Toast
      backgroundColor={backgroundColor[type]}
      opacity={1}
      containerStyle={toastContainerStyle}
      visible={isVisible}
      position={40}
      shadow={true}
      animation={true}
      hideOnPress={false}
    >
      <Container>
        {icon[type]}
        <TextContainer>
          <StyledText>{title}</StyledText>
          {subtitle.length > 0 && (
            <SubtitleContainer>
              <StyledText>{subtitle}</StyledText>
            </SubtitleContainer>
          )}
        </TextContainer>
        <TouchableWithoutFeedback onPress={onHideToast}>
          <View>
            <Icon type="close" iconColor={theme.colors.white[100]} />
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </Toast>
  );
};
