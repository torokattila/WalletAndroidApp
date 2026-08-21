/* eslint-disable react-hooks/exhaustive-deps */
import { useVibration } from '@hooks/useVibration';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import React, { FC, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Container, TabButtonHighlight } from './TabButton.styles';

export const TabButton: FC<BottomTabBarButtonProps> = ({ children, onPress, ...props }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);
  const { vibrateLight } = useVibration();

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const handlePress = (e: any) => {
    vibrateLight();
    onPress?.(e);
  };

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 500 });
    scale.value = withTiming(1, { duration: 500, easing: Easing.bounce });
  }, []);

  useEffect(() => {
    if (props.accessibilityState.selected) {
      opacity.value = withTiming(1, { duration: 500 });
    } else {
      opacity.value = withTiming(0, { duration: 500 });
    }
  }, [props.accessibilityState.selected]);

  return (
    <TouchableOpacity style={contentStyle} onPress={handlePress} {...props}>
      <Container>
        <TabButtonHighlight active={props.accessibilityState.selected} style={backgroundStyle} />
        {children}
      </Container>
    </TouchableOpacity>
  );
};
