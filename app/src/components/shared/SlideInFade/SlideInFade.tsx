import React, { FC, ReactNode } from 'react';
import Animated, { FadeInLeft } from 'react-native-reanimated';

type SlideInFadeProps = {
  children: ReactNode;
  index?: number;
};

const ANIMATION_DURATION = 400;
const STAGGER_DELAY = 75;
const MAX_STAGGER_DELAY = 525;

export const SlideInFade: FC<SlideInFadeProps> = ({ children, index = 0 }) => (
  <Animated.View
    needsOffscreenAlphaCompositing
    entering={FadeInLeft.duration(ANIMATION_DURATION).delay(
      Math.min(index * STAGGER_DELAY, MAX_STAGGER_DELAY)
    )}
  >
    {children}
  </Animated.View>
);
