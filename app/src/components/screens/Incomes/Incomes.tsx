import React, { FC } from 'react';
import i18n from 'i18n-js';
import { AddButton, Icon } from '@components/shared';
import { useUser } from '@hooks/useUser';
import {
  BalanceContainer,
  BalanceTitle,
  Balance,
  Container,
  ContentContainer,
  ScreenTitleContainer,
  ScreenTitleText,
  scrollViewStyle,
  StyledLinearGradient,
} from './Incomes.styles';

export const Incomes: FC = () => {
  const { user } = useUser();

  return (
    <Container contentContainerStyle={scrollViewStyle}>
      <StyledLinearGradient
        colors={['#4547B8', '#8E65F7']}
        useAngle
        angle={140}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScreenTitleContainer>
          <ScreenTitleText>{i18n.t('Incomes.ScreenTitle')}</ScreenTitleText>
          <Icon type="income" iconColor="#fff" />
        </ScreenTitleContainer>

        <BalanceContainer>
          <BalanceTitle>{i18n.t('BalanceTitle')}</BalanceTitle>
          <Balance>{user.balance} Ft</Balance>
        </BalanceContainer>
        <ContentContainer>
          <AddButton onPress={() => {}} />
        </ContentContainer>
      </StyledLinearGradient>
    </Container>
  );
};
