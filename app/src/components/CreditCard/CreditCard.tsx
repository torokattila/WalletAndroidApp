import React, { FC } from 'react';
import { theme } from '@styles/theme';
import { Icon } from '@components/shared';
import {
  Balance,
  CardDate,
  CardName,
  CardNumber,
  Container,
  VisaLogoContainer,
} from './CreditCard.styles';

type CreditCardProps = {
  name: string;
  balance: number;
};

const cardShadow = {
  elevation: 15,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 20 },
  shadowOpacity: 0.58,
  shadowRadius: 15,
};

export const CreditCard: FC<CreditCardProps> = ({ name, balance }) => (
  <Container colors={['#4547B8', '#8E65F7']} useAngle angle={140} style={cardShadow}>
    <VisaLogoContainer>
      <Icon type="visa" iconColor={theme.colors.white} />
    </VisaLogoContainer>
    <Balance>{balance} Ft</Balance>
    <CardNumber>0000 1111 2222 3333</CardNumber>
    <CardName>{name}</CardName>
    <CardDate>00/00</CardDate>
  </Container>
);
