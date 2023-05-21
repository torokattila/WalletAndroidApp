import React, { FC } from 'react';
import { format } from 'date-fns';
import i18n from 'i18n-js';
import { Icon } from '@components/shared';
import { Purchase } from '@model/domain';
import { useDarkMode } from '@hooks/useDarkMode';
import { theme } from '@styles/theme';
import {
  Amount,
  Category,
  CategoryAndAmountContainer,
  Container,
  IconContainer,
  PurchaseDate,
} from './PurchaseCard.styles';

type PurchaseCardProps = {
  purchase: Purchase;
  onPress: () => void;
};

const cardIcon = {
  food: <Icon type="hamburger" iconColor={theme.colors.white[100]} />,
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

export const PurchaseCard: FC<PurchaseCardProps> = ({ purchase, onPress }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Container style={!isDarkMode && cardShadow} onPress={onPress} isDarkMode={isDarkMode}>
      <IconContainer style={cardShadow} isDarkMode={isDarkMode}>
        {cardIcon[purchase.category]}
      </IconContainer>

      <CategoryAndAmountContainer>
        {<Category>{i18n.t(`Purchases.Categories.${purchase.category}`)}</Category>}
        <Amount>- {purchase.amount} Ft</Amount>
      </CategoryAndAmountContainer>

      <PurchaseDate>{format(purchase.updatedAt.toDate(), 'yyyy-MM.dd.')}</PurchaseDate>
    </Container>
  );
};
