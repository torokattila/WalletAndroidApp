import { theme } from '@styles/theme';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';
import {
  AppContainer,
  Loader,
  SplashContainer,
  StyledImage,
  StyledTitle,
} from './LoadingScreen.styles';

type LoadingScreenProps = {
  isAppReady: boolean;
} & PropsWithChildren;

export const LoadingScreen: FC<LoadingScreenProps> = ({ isAppReady, children }) => {
  const opacity = new Animated.Value(0);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: false,
      }).start(() => setTimeout(() => setIsAnimationComplete(true), 1000));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAppReady]);

  return (
    <AppContainer>
      {isAnimationComplete && children}
      {!isAnimationComplete && (
        <SplashContainer style={{ opacity }}>
          <StyledImage source={require('../../../assets/wallet.png')} />
          <StyledTitle>Wallet</StyledTitle>
          <Loader color={theme.colors.purple[100]} size="large" animating />
        </SplashContainer>
      )}
    </AppContainer>
  );
};
