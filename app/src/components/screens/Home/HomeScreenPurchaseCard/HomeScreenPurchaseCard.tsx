import React, { FC } from 'react';
import i18n from 'i18n-js';
import { format } from 'date-fns';
import { Icon } from '@components/shared';
import { Purchase } from '@model/domain';
import { theme } from '@styles/theme';
import {
  Amount,
  Category,
  CategoryAndAmountContainer,
  Container,
  IconContainer,
  PurchaseDate,
} from './HomeScreenPurchaseCard.styles';

type HomeScreenPurchaseCardProps = { purchase: Purchase; onPress: () => void };

const cardIcon = {
  food: <Icon type="hamburger-big" iconColor={theme.colors.white[100]} />,
  clothing: <Icon type="clothing-big" iconColor={theme.colors.white[100]} />,
  entertainment: <Icon type="entertainment-big" iconColor={theme.colors.white[100]} />,
  other: <Icon type="other-purchase-big" iconColor={theme.colors.white[100]} />,
};

const cardShadow = {
  elevation: 4,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
};

export const HomeScreenPurchaseCard: FC<HomeScreenPurchaseCardProps> = ({ purchase, onPress }) => (
  <Container style={cardShadow} onPress={onPress}>
    <IconContainer style={cardShadow}>{cardIcon[purchase.category]}</IconContainer>

    <CategoryAndAmountContainer>
      {<Category>{i18n.t(`Purchases.Categories.${purchase.category}`)}</Category>}
      <Amount>- {purchase.amount} Ft</Amount>
    </CategoryAndAmountContainer>

    <PurchaseDate>{format(purchase.updatedAt.toDate(), 'yyyy-MM.dd.')}</PurchaseDate>
  </Container>
);
