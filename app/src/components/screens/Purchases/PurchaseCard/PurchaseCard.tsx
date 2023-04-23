import React, { FC } from 'react';
import { Icon } from '@components/shared';
import { Purchase } from '@model/domain';
import { theme } from '@styles/theme';
import { Container, IconContainer } from './PurchaseCard.styles';

type PurchaseCardProps = {
  purchase: Purchase;
  onPress: () => void;
};

const cardIcon = {
  hamburger: <Icon type="hamburger" iconColor={theme.colors.white[100]} />,
  clothing: <Icon type="clothing" iconColor={theme.colors.white[100]} />,
  entertainment: <Icon type="entertainment" iconColor={theme.colors.white[100]} />,
  other: <Icon type="other-purchase" iconColor={theme.colors.white[100]} />,
};

const cardShadow = {
  elevation: 4,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
};

export const PurchaseCard: FC<PurchaseCardProps> = ({ purchase, onPress }) => (
  <Container style={cardShadow} onPress={onPress}>
    <IconContainer>{cardIcon[purchase.category]}</IconContainer>
  </Container>
);
