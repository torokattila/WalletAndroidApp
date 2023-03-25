/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { TabButtonHighlight, Container } from './TabButton.styles';

export const TabButton: FC<BottomTabBarButtonProps> = ({ children, ...props }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

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
    <TouchableOpacity {...props}>
      <Container style={contentStyle}>
        <TabButtonHighlight active={props.accessibilityState.selected} style={backgroundStyle} />
        {children}
      </Container>
    </TouchableOpacity>
  );
};
