import React, { FC } from 'react';
// import i18n from 'i18n-js';
import { useUser } from '@hooks/useUser';
import {
  Container,
  ContentContainer,
  scrollViewStyle,
  StyledLinearGradient,
  WelcomeText,
} from './Home.styles';
import { getLocalizedName } from '@core/name';
import { CreditCard } from '@components/CreditCard';

export const Home: FC = () => {
  const { user } = useUser();
  const localizedName = getLocalizedName(user?.lastname, user?.firstname);

  return (
    <Container contentContainerStyle={scrollViewStyle}>
      <StyledLinearGradient
        colors={['#2C1F5F', '#4c397a', '#9068ee', '#b296f1', '#ffffff', '#3f087a57']}
        useAngle
        angle={140}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <WelcomeText>Hello {user?.firstname}!</WelcomeText>

        <ContentContainer>
          <CreditCard name={localizedName} balance={user?.balance} />
        </ContentContainer>
      </StyledLinearGradient>
    </Container>
  );
};
