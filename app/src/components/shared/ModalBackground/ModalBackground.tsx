import React, { FC, useEffect, useRef, memo } from 'react';
import { Animated } from 'react-native';
import { StyledTouchableOpacity } from './ModalBackground.styles';

type ModalBackgroundProps = {
  onHide: () => void;
  isVisible: boolean;
};

const ModalBackgroundComponent: FC<ModalBackgroundProps> = ({ onHide, isVisible, ...props }) => {
  const fadeAnimation = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      delay: 200,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    isVisible && fadeIn();
    !isVisible && fadeOut();

    return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const AnimatedBackground = Animated.createAnimatedComponent(StyledTouchableOpacity);

  return <AnimatedBackground onPress={onHide} style={{ opacity: fadeAnimation }} {...props} />;
};

export const ModalBackground = memo(ModalBackgroundComponent);
